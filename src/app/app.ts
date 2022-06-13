import EventEmitter from "events";
import http from 'http';

export class Application {

  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  private createServer(): http.Server {
    return http.createServer((req, res) => {

    });
  }
}