import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Samurai } from "samuraijs";

new Samurai({
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
});
