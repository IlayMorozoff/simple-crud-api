import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../error/error';
import { IUserModel, Messages } from "../model/users";
import { STATUS_CODES } from '../utils/writeHeader';
import { Validator } from '../validator/validator';
import { Repository } from '../repository/repository';


export class UserService {
  private repository = new Repository();
  private validator = new Validator();

  findAll(): Promise<IUserModel[]> {
    return new Promise((resolve) => {

      const users = this.repository.findAll();
      resolve(users);
    })
  }

  findById(id: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      const user = this.repository.findById(id);
      
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
      const newUserFromRep = this.repository.create(newUser);
      resolve(newUserFromRep);
    });
  }

  update(id: string, user: IUserModel): Promise<IUserModel> {
    return new Promise(async (resolve, reject) => {
      try {

        const currentDataUser = await this.findById(id);
  
        const { age, hobbies, username } = user;
  
        const newUpdatedBody: IUserModel = {
          age: age || currentDataUser.age,
          hobbies: hobbies || currentDataUser.hobbies,
          username: username || currentDataUser.username
        }
        const updatedUser = this.repository.update(id,newUpdatedBody);

        if (!updatedUser) {
          const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
          reject(err);
        }

        resolve(updatedUser);
      } catch (error) {
        const err = new CustomError(Messages.UserNotFound, STATUS_CODES.NotFound);
        reject(err);
      }
    })
  }

  delete(id: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      const deletedUser = this.repository.delete(id)
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