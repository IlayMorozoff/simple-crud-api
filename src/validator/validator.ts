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

  validateData(body: IUserModel) {

    const keys = Object.keys(body);

    const isUsernameValidType = typeof body.username === 'string';
    const isAgeValidType = typeof body.age === 'number';
    const isHobbiesValidType = Array.isArray(body.hobbies) && body.hobbies.every((item) => typeof item === 'string');

    const validateDict = {
      username: isUsernameValidType,
      age: isAgeValidType,
      hobbies: isHobbiesValidType
    }

    const newArrkeys = []

    for(let i = 0; i < keys.length; i++) {
      newArrkeys.push(validateDict[keys[i] as keyof typeof validateDict]);
    }

    return newArrkeys.every((item) => item);
  }

}