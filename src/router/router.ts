import EventEmitter from "events";
import http from "http";
import { UserController } from "../userController/userController";;
import { STATUS_CODES, writeHeader } from "../utils/writeHeader";
import { jsonParser } from '../utils/jsonParser';

const enum Urls {
  BASE_REQUES = '/api/users',
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
      if (this.validateRequest(req) && this.isGetMethod(req)) {
        this.userController.getUsers(req, res);
      } else if (this.isGetMethod(req) && this.validateParams(req)) {
        const id = this.getParamsId(req);
        this.userController.getUser(req, res, id);
      } else if (this.isPostMethod(req) && this.validateRequest(req)) {
        this.userController.createUser(req, res);
      } else if (this.isPutMethod(req) && this.validateParams(req)) {
        const id = this.getParamsId(req);
        this.userController.updateUser(req, res, id);
      } else if (this.isDeleteMethod(req) && this.validateParams(req)) {
        const id = this.getParamsId(req);
        this.userController.deleteUser(req, res, id);
      } else {
        writeHeader(res, STATUS_CODES.NotFound);
        jsonParser(res, { message: 'This resource was not found' });
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
    const isValid = req.url?.split('/').filter((item) => !!item);
    if (isValid && !(isValid.length === 3)) {
      return '';
    }
    return req.url?.split('/')[3] as string;
  }

  private validateRequest(req: http.IncomingMessage): boolean | void {
    if (req.url) {
      return req.url.replace(/\/*$/g, "") === Urls.BASE_REQUES
    }
  }

  private validateParams(req: http.IncomingMessage) {
    return this.getParamsId(req) && req.url && req.url.includes(Urls.BASE_REQUES);
  }

}