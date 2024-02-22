import { Document, Types } from "mongoose";

export interface IUser {
    email: string,
    id: Types.ObjectId,
    name: string,
}

export interface IUserSchema extends Document {
    email: string,
    password: string,
    name: string,
}

