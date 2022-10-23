export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  birthDate?: string
}
export interface IUserRegister {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  birthDate?: string
}
export interface IUserMongoDoc {
  _doc: IUser
}

export interface IUserSearch {
  firstName?: string
  lastName?: string
  email?: string
  gender?: string
  birthDate?: string
}

export interface IUserGetParams {
  id?: string
}
