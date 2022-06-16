import { IUserModel } from "../model/users";
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export class Validator {
  requiredField: string[];

  constructor() {
    this.requiredField = ['username', 'age', 'hobbies'];
  }

  isAllRequireField(body: IUserModel): boolean {
    const keys = Object.keys(body);

    return this.requiredField.every((key) => keys.includes(key));
  }

  uuidValidateV4(uuid: string): boolean {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

}