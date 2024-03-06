import { Document } from 'mongoose'
import { IUser } from './IUser'

export interface IToken {
    user: IUser
    refreshToken: string
}

export interface ITokenSchema extends Document {
    user: IUser
    refreshToken: string
}
