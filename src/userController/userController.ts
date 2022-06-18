import http from 'http';
import { CustomError } from '../error/error';
import { IUserModel, Messages } from '../model/users';
import { userService } from '../services/userService';
import { bodyParser } from '../utils/bodyParser';
import { handleError } from '../utils/handleError';
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
      handleError(res, error);
    }
  }

  async getUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {
      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError(Messages.NotUuid, STATUS_CODES.BadRequest);
      }

      const users = await userService.findById(id);
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, users);
    } catch (error) {
      handleError(res, error);
    }
  }

  async createUser(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      const body = await bodyParser(req, res) as IUserModel;
      if (!this.validator.isAllRequireField(body)) {
        throw new CustomError(Messages.RequiredFieldNotFound, STATUS_CODES.BadRequest);
      }
      const user = await userService.create(body);
      writeHeader(res, STATUS_CODES.Created);
      jsonParser(res, user);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
    try {

      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError(Messages.NotUuid, STATUS_CODES.BadRequest);
      }

      const body = await bodyParser(req, res) as IUserModel;
      const updatedUser = await userService.update(id, body);
      writeHeader(res, STATUS_CODES.OK);
      jsonParser(res, updatedUser);
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
    try {
      if (!this.validator.uuidValidateV4(id)) {
        throw new CustomError(Messages.NotUuid, STATUS_CODES.BadRequest);
      }
      const updatedUser = await userService.delete(id);

      writeHeader(res, STATUS_CODES.NoContent);
      jsonParser(res, updatedUser);
    } catch (error) {
      handleError(res, error);
    }
  }
}

