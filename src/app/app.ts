import EventEmitter from 'events';
import http from 'http';
import { Router } from '../router/router';

export class Application {
  private server: http.Server;
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
      const isEmit = this.eventEmitter.emit('initRouter', req, res);
      
      if (!isEmit) {
        res.writeHead(404, {
          'Content-type': 'application/json'
        })
        res.end(JSON.stringify({ message: 'there is no such endpoint' }));
      }
    });
  }
}