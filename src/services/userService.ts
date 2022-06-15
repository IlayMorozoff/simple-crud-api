import { v4 as uuidv4 } from 'uuid';
import { IUserModel } from "../model/users";


export class UserService {
  private users: IUserModel[];

  constructor() {
    this.users = [{
      hobbies: [],
      id: '1',
      username: '2323',
      age: 29
    }];
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
      }
      reject('could not find the user in the database');
    });
  }

  create(user: IUserModel): Promise<IUserModel> {
    return new Promise((resolve) => {
      const newUser = { id: uuidv4(), ...user };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  update(id: string, user: IUserModel): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      const updatedUserIndex = this.users.findIndex((item) => item.id === id);

      this.users[updatedUserIndex] = { id, ...user };

      resolve(this.users[updatedUserIndex]);
    })
  }

  delete(id: string): Promise<IUserModel> {
    return new Promise((resolve) => {
      const deletedUser = this.users.find((el) => el.id === id);
      this.users = this.users.filter((item) => item.id !== id);
      if (deletedUser) {
        resolve(deletedUser);
      }
    });
  }
}

export const userService = new UserService();