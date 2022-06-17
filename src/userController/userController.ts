import http from 'http';
import { CustomError } from '../error/error';
import { IUserModel } from '../model/users';
import { userService } from '../services/userService';
import { bodyParser } from '../utils/bodyParser';
import { handle500Error } from '../utils/handle500Error';
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
      if (error instanceof CustomError) {
        writeHeader(res, error.status);
        jsonParser(res, { message: error.message});
      } else {
        handle500Error(res);
      }
    }
  }

  async getUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {
      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError('the user ID is not a uuid', STATUS_CODES.BadRequest);
      }

      const users = await userService.findById(id);
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, users);
    } catch (error) {
      if (error instanceof CustomError) {
        writeHeader(res, error.status);
        jsonParser(res, { message: error.message});
      } else {
        handle500Error(res);
      }
    }
  }

  async createUser(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const body = await bodyParser(req, res) as IUserModel;
      if (!this.validator.isAllRequireField(body)) {
        throw new CustomError('one of the required fields (username, age, hobbies) is not specified', STATUS_CODES.BadRequest);
      }
      const user = await userService.create(body);
      writeHeader(res, STATUS_CODES.Created);
      jsonParser(res, user);
    } catch (error) {
      if (error instanceof CustomError) {
        writeHeader(res, error.status);
        jsonParser(res, { message: error.message});
      } else {
        handle500Error(res);
      }
    }
  }

  async updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {

      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError('the user ID is not a uuid', STATUS_CODES.BadRequest);
      }

      const body = await bodyParser(req, res) as IUserModel;
      const updatedUser = await userService.update(id, body);
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, updatedUser);
    } catch (error) {
      const err = error as CustomError;
      writeHeader(res, err.status);
      jsonParser(res, { message: err.message});
    }
  }

  async deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
    try {
      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError('the user ID is not a uuid', STATUS_CODES.BadRequest);
      }
      const updatedUser = await userService.delete(id);

      writeHeader(res, STATUS_CODES.NoContent);
      jsonParser(res, updatedUser);
    } catch (error) {
      if (error instanceof CustomError) {
        writeHeader(res, error.status);
        jsonParser(res, { message: error.message});
      } else {
        handle500Error(res);
      }
    }
  }
}

