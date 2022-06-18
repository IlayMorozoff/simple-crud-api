import EventEmitter from 'events';
import http from 'http';
import { Router } from '../router/router';

export class Application {
  server: http.Server;
  private eventEmitter = new EventEmitter()

  constructor() {
    this.server = this.createServer();
    new Router(this.eventEmitter);
  }

  public listen(port: number | string, callback: () => void) {
    this.server.listen(port, callback);
  }

  private createServer(): http.Server {
    return http.createServer((req, res) => {
      this.eventEmitter.emit('initRouter', req, res);
    });
  }
}