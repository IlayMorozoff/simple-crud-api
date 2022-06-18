export interface IUserModel {
  id?: string,
  username: string,
  age: number,
  hobbies: string[]
}

export const enum Messages {
  ResourceNotFound = 'This resource was not found',
  UserNotFound = 'user with such a id was not found',
  RequiredFieldNotFound = 'one of the required fields (username, age, hobbies) is not specified',
  NotUuid = 'the user ID is not a uuid',
  ServerIternalError = '500 - internal server error - something went wrong'
}