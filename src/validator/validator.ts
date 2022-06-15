import { IUserModel } from "../model/users";

export class Validator {
  private requiredField: string[];

  constructor() {
    this.requiredField = ['username', 'age', 'hobbies'];
  }

  isAllRequireField(body: IUserModel): boolean {
    const keys = Object.keys(body);

    return this.requiredField.every((key) => keys.includes(key));
  }
}