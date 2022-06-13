import EventEmitter from 'events';
import http from 'http';

export const emiter = new EventEmitter();

const enum Urls {
  BASE_REQUES = 'api/users',
  ADDITIONAL_REQUES = 'api/users/:id'
}

const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type callbackType = (req: http.IncomingMessage, res: http.ServerResponse) => void;

interface IMethodHandler {
  [Methods.DELETE]?: callbackType;
  [Methods.GET]?: callbackType;
  [Methods.POST]?: callbackType;
  [Methods.PUT]?: callbackType;
}

interface IEndpoint {
  [key: string]: IMethodHandler
}

export class Router {
  endpoints: IEndpoint;

  constructor() {
    this.endpoints = {}
  }

  private request(method: Methods, path: string, callback: callbackType) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`${method} - по адресу ${path} уже существует`);
    }

    endpoint[method] = callback;


    console.log(this.endpoints)
    emiter.on(`(${path})===(${method})`, (req: http.IncomingMessage, res: http.ServerResponse) => {
      console.log(req)
      callback(req, res);
    })
  }

  public get(path: string, callback: callbackType) {
    this.request(Methods.GET, path, callback);
    console.log('223')
  }

  public post(path: string, callback: callbackType) {
    this.request(Methods.POST, path, callback);
  }

  public put(path: string, callback: callbackType) {
    this.request(Methods.PUT, path, callback);
  }

  public delete(path: string, callback: callbackType) {
    this.request(Methods.DELETE, path, callback);
  }
}