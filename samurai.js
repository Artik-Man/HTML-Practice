import {readFileSync} from 'fs';
import {resolve} from 'path';
import {Builder, Server} from "./lib/samurai/public_api.js";

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
