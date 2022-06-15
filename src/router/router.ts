import EventEmitter from "events";
import {  } from 'uuid';
import http from "http";
import { UserController } from "../userController/userController";
import { uuidValidateV4 } from "../utils/isValidUuid";

const enum Urls {
  BASE_REQUES = '/api/users',
  ADDITIONAL_REQUES = '/api/users/:id'
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export class Router {
  private eventEmitter: EventEmitter;
  private userController: UserController;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.userController = new UserController();
    this.eventEmitter.on('initRouter', (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.url) {
        console.log(this.isGetMethod(req), this.isValidId(req), req.url, req.url.match(/\/api\/users\/([0-9]+)/))
      }
      if (req.url && req.url.replace(/\/*$/g, "") === Urls.BASE_REQUES && this.isGetMethod(req)) {
        this.userController.getUsers(req, res);
      } else if (this.isGetMethod(req) && req.url && req.url.match(/\/api\/users\/([0-9]+)/)) {
        const id = this.getParamsId(req);
        this.userController.getUser(req, res, id);
      } else if (this.isPostMethod(req) && req.url && req.url.replace(/\/*$/g, "") === Urls.BASE_REQUES) {
        this.userController.createUser(req, res);
      }
    });
  }

  private isGetMethod(req: http.IncomingMessage) {
    return req.method === Methods.GET;
  }

  private isPostMethod(req: http.IncomingMessage) {
    return req.method === Methods.POST;
  }

  private isPutMethod(req: http.IncomingMessage) {
    return req.method === Methods.PUT;
  }

  private isDeleteMethod(req: http.IncomingMessage) {
    return req.method === Methods.DELETE;
  }

  private getParamsId(req: http.IncomingMessage): string {
    return req.url?.split('/')[3] as string;
  }

  private isValidId(req: http.IncomingMessage) {
    const id = this.getParamsId(req);
    return uuidValidateV4(id);
  }

}