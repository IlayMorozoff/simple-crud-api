import http from 'http';
import { IUserModel } from '../model/users';
import { userService } from '../services/userService';
import { bodyParser } from '../utils/bodyParser';
import { jsonParser } from '../utils/jsonParser';
import { STATUS_CODES, writeHeader } from '../utils/writeHeader';
import { Validator } from '../validator/validator';

export class UserController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  async getUsers(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const users = await userService.findAll();
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, users);
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {
      const users = await userService.findById(id);
      console.log(users)
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, users);
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const body = await bodyParser(req) as IUserModel;
      console.log('is valid')
      if (!this.validator.isAllRequireField(body)) {
        console.log('is valid')
        res.end('Не указаны обязательные поля')
        return;
      }
      const user = await userService.create(body);
      console.log(user)
      writeHeader(res, STATUS_CODES.Created);
      jsonParser(res, user);
    } catch (error) {
      console.log(error);
    }
  }
}

