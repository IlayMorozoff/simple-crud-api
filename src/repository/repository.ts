import { IUserModel } from "../model/users";

export class Repository {
  private users: IUserModel[] = [];

  findAll(): IUserModel[] {
    return this.users;
  }

  findById(id: string): IUserModel | void {
    const user = this.users.find((item) => item.id === id);

    if (user) {
      return user;
    }
  }

  create(user: IUserModel): IUserModel {
    this.users.push(user);
    return user;
  }

  update(id: string, user: IUserModel): IUserModel {
    const updatedUserIndex = this.users.findIndex((item) => item.id === id);
    this.users[updatedUserIndex] = { id, ...user };
    return this.users[updatedUserIndex];
  }

  delete(id: string): IUserModel | void {
    const deletedUser = this.users.find((el) => el.id === id);
    this.users = this.users.filter((item) => item.id !== id);

    if (deletedUser) {
      return deletedUser;
    }
  }
}