export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IUserGetParams {
  id?: string
}
