import EventEmitter from "events";
import http from "http";

const enum Urls {
  BASE_REQUES = '/api/users',
  ADDITIONAL_REQUES = 'api/users/:id'
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export class Router {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on('initRouter', (req: http.IncomingMessage, res: http.ServerResponse) => {
      // res.end('dsadsadasdsa')
      // console.log(1,  req.url)
      if (req.url === Urls.BASE_REQUES && req.method === Methods.GET) {
        res.end('dsadsadasdsa')
        console.log(1)
      }
    });
  }

  private get(req: http.IncomingMessage, res: http.ServerResponse) {
    
  }
}