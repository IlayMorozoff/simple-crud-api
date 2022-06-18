import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../error/error';
import { IUserModel, Messages } from "../model/users";
import { STATUS_CODES } from '../utils/writeHeader';
import { Validator } from '../validator/validator';


export class UserService {
  private users: IUserModel[] = [];
  private validator = new Validator();

  constructor() {
    this.users = [];
  }

  findAll(): Promise<IUserModel[]> {
    return new Promise((resolve) => {

      resolve(this.users);
    })
  }

  findById(id: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((item) => item.id === id);
      if (user) {
        resolve(user);
      } else {
        const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
        reject(err);
      }
    });
  }

  create(user: IUserModel): Promise<IUserModel> {
    return new Promise((resolve) => {
      const normalizedBody = this.normalizeBody(user);
      const newUser = { id: uuidv4(), ...normalizedBody };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  update(id: string, user: IUserModel): Promise<IUserModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUserIndex = this.users.findIndex((item) => item.id === id);

        if (updatedUserIndex === -1) {
          const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
          reject(err);
        }
        const currentDataUser = await this.findById(id);
  
        const { age, hobbies, username } = user;
  
        const newUpdatedBody: IUserModel = {
          age: age || currentDataUser.age,
          hobbies: hobbies || currentDataUser.hobbies,
          username: username || currentDataUser.username
        }
        this.users[updatedUserIndex] = { id, ...newUpdatedBody };
  
        resolve(this.users[updatedUserIndex]);
      } catch (error) {
        const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
        reject(err);
      }
    })
  }

  delete(id: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      const deletedUser = this.users.find((el) => el.id === id);
      this.users = this.users.filter((item) => item.id !== id);
      if (deletedUser) {
        resolve(deletedUser);
      } else {
        const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
        reject(err);
      }
    });
  }

  normalizeBody(body: IUserModel): IUserModel {
    const newBody: IUserModel = JSON.parse(JSON.stringify(body));

    for (let key in newBody) {
      if (!this.validator.requiredField.includes(key)) {
        delete newBody[key as keyof IUserModel];
      }
    }

    return newBody;
  }
}