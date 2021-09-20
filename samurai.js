import {copyFile, existsSync, mkdir, readdir, readFile, readFileSync, rmdirSync, statSync, writeFile} from 'fs';
import {dirname, extname, relative, resolve} from 'path';
import {build as esbuild} from 'esbuild';
import nunjucks from 'nunjucks'
import sass from 'node-sass';
import browserSync from 'browser-sync';

export class Builder {
  extensions = {
    njk: '.njk',
    scss: '.scss',
    css: '.css',
    ts: '.ts',
    js: '.js',
    json: '.json',
    html: '.html'
  }

  builders = {
    [this.extensions.njk]: async (path) => {
      return new Promise((resolve) => {
        readFile(path.replace(this.extensions.njk, this.extensions.json), "utf8", (err, data) => {
          const context = data ? JSON.parse(data) : {};
          const html = nunjucks.render(path, context);
          resolve(html);
        });
      })
    },
    [this.extensions.scss]: (path) => {
      return new Promise((resolve, reject) => {
        sass.render({
          ...this.config.sass,
          file: path
        }, (err, result) => {
          if (!err) {
            resolve(result.css.toString())
          } else {
            reject(err);
          }
        });
      })
    },
    [this.extensions.ts]: (path) => esbuild({
      ...this.config.esbuild,
      entryPoints: [path]
    }).then(result => {
      const [contents] = result.outputFiles.map(f => f.text);
      return contents;
    })
  };

  constructor(config) {
    this.config = config;
    this.sourcePath = resolve(config.paths.source);
    this.destinationPath = resolve(config.paths.destination);
    this.excludePaths = (config.paths.exclude || []).map(x => resolve(x));
    this.assetsPaths = (config.paths.assets || []).map(x => resolve(x));

    const env = nunjucks.configure({
      ...config.nunjucks
    });

    if (config.nunjucks?.globals) {
      Object.keys(config.nunjucks.globals).forEach(key => {
        env.addGlobal(key, config.nunjucks.globals[key]);
      })
    }
  }


  build() {
    rmdirSync(this.destinationPath, {recursive: true});
    this.readDirRecursively(this.sourcePath);
  }

  getDistPath(path) {
    return resolve(this.destinationPath, relative(this.sourcePath, this.destinationPath), relative(this.sourcePath, path));
  }

  makeDirs(path, callback) {
    const dirPath = dirname(path);
    mkdir(dirPath, {recursive: true}, (errMkDir) => {
      if (errMkDir) {
        console.error(`Something wrong with making directory ${dirPath}`, errMkDir);
      } else {
        callback()
      }
    });
  }

  placeFile(path, content) {
    const filePath = this.getDistPath(path);

    this.makeDirs(filePath, () => {
      writeFile(filePath, content, errWriteFile => {
        if (errWriteFile) {
          console.error(`Something wrong with writing file ${filePath}`, errWriteFile);
        } else {
          if (config.logLevel === "debug") {
            console.log(`Successful compiling: ${filePath}`);
          }
        }
      })
    })
  }

  copyAsset(path) {
    const filePath = this.getDistPath(path);

    this.makeDirs(filePath, () => {
      copyFile(path, filePath, (err) => {
        if (err) {
          console.error(`Something wrong with copying file ${filePath}`, err);
        } else {
          if (this.config.logLevel === 'debug') {
            console.log(`Copy file: ${filePath}`);
          }
        }
      })
    })
  }

  buildStyles(file) {
    this.builders[this.extensions.scss](file).then(css => {
      this.placeFile(file.replace(this.extensions.scss, this.extensions.css), css);
    });
  }

  buildScripts(file) {
    this.builders[this.extensions.ts](file).then(js => {
      this.placeFile(file.replace(this.extensions.ts, this.extensions.js), js);
    });
  }

  getBuilder(file) {
    if (existsSync(file)) {
      const ext = extname(file);
      return this.builders[ext](file);
    }
    return Promise.resolve('');
  }

  bundleContent(html, css, js) {
    if (css) {
      const headRegExp = new RegExp("<\/head>");
      const head = headRegExp.test(html);
      if (head) {
        html = html.replace(headRegExp, `<style>${css}</style>\n</head>`)
      } else {
        html = `<style>${css}</style>\n${html}`
      }
    }

    if (js) {
      const bodyRegExp = new RegExp("<\/body>");
      const body = bodyRegExp.test(html);
      if (body) {
        html = html.replace(bodyRegExp, `<script>${js}</script>\n</body>`)
      } else {
        html = `${html}\n<script>${js}</script>`
      }
    }

    return html
  }

  createComponent(fileWithoutExtension) {
    const promises = [
      this.getBuilder(`${fileWithoutExtension}${this.extensions.njk}`),
      this.getBuilder(`${fileWithoutExtension}${this.extensions.scss}`),
      this.getBuilder(`${fileWithoutExtension}${this.extensions.ts}`),
    ];


    Promise.all(promises)
      .then(results => {
        const [html, css, js] = results.map(text => text.trim());

        this.placeFile(`${fileWithoutExtension}${this.extensions.html}`, this.bundleContent(html, css, js))
      });
  }

  componentWorker(collection) {
    collection.forEach(file => {
      this.createComponent(file);
    });
  }


  readDirRecursively(path) {
    readdir(path, {}, (error, files) => {
      const collection = [];

      files.forEach(file => {
        const fullPath = resolve(path, file);
        if (!this.excludePaths.includes(fullPath)) {
          const ext = extname(file);
          if (ext === this.extensions.njk) {
            if (file.indexOf('_') !== 0) {
              collection.push(fullPath.slice(0, -1 * ext.length));
            }
          } else if (statSync(fullPath).isDirectory()) {
            this.readDirRecursively(fullPath);
          } else if (this.assetsPaths.includes(fullPath) || ![this.extensions.scss, this.extensions.ts, this.extensions.json].includes(ext)) {
            this.copyAsset(fullPath);
          } else if (ext === this.extensions.scss && !existsSync(fullPath.slice(0, -1 * ext.length) + this.extensions.njk)) {
            this.buildStyles(fullPath);
          } else if (ext === this.extensions.ts && !existsSync(fullPath.slice(0, -1 * ext.length) + this.extensions.njk)) {
            this.buildScripts(fullPath);
          }
        }
      });

      this.componentWorker(collection);
    });
  }
}


export class Server {
  constructor(config) {
    this.builder = new Builder(config);

    this.builder.build();

    browserSync({
      ...config.server,
      server: config.paths.destination
    });

    browserSync.watch(this.getSourceFiles()).on('change', () => {
      if (config.logLevel === "debug") {
        console.log(`Changes in ${config.paths.source}`);
      }
      this.builder.build();
      browserSync.reload();
    });

  }

  getSourceFiles() {
    const path = config.paths.source.split('/');
    path.push('**', '*');
    return path.join('/');
  }
}

const config = {
  paths: {
    source: 'src',
    destination: 'dist',
    assets: ['src/assets'],
    exclude: ['src/templates', 'src/styles', 'src/scripts']
  },
  // logLevel: 'debug',
  nunjucks: {
    autoescape: true,
    trimBlocks: true,
    noCache: true,
    globals: {
      loadJson: (path) => {
        return JSON.parse(readFileSync(resolve(path), "utf8"))
      }
    }
  },
  esbuild: {
    minify: true,
    bundle: true,
    write: false
  },
  sass: {
    outputStyle: "compressed"
  },
  server: {
    port: 3000,
    open: false
  }
}

if (process.argv.includes('--build')) {
  new Builder(config).build()
} else if (process.argv.includes('--serve')) {
  new Server(config);
} else {
  throw 'Unknown action'
}
