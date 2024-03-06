import { Request } from 'express'
import { Document, Types } from 'mongoose'

export interface IUser {
    email: string
    id: Types.ObjectId
    name: string
}

export interface IUserSchema extends Document {
    email: string
    password: string
    name: string
}

export interface AuthRequest extends Request {
    user?: IUser
}
