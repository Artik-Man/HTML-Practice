import browserSync from "browser-sync";
import {Builder} from "./builder.js";

export class Server {
  constructor(config) {
    this.config = config;
    this.builder = new Builder(config);

    this.builder.build();

    browserSync({
      ...config.server,
      server: this.config.paths.destination
    });

    browserSync.watch(this.getSourceFiles()).on('change', () => {
      if (config.logLevel === "debug") {
        console.log(`Changes in ${this.config.paths.source}`);
      }
      this.builder.build();
      browserSync.reload();
    });

  }

  getSourceFiles() {
    const path = this.config.paths.source.split('/');
    path.push('**', '*');
    return path.join('/');
  }
}
