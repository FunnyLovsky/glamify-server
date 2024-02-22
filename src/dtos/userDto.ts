import { Document, Types } from "mongoose";

interface IUserModel {
    email: string; 
    name: string
}

export interface IUser {
    email: string,
    id: Types.ObjectId,
    name: string,
}

export default class UserDto {
    email: string;
    id: Types.ObjectId;
    name: string
   
    constructor(model: IUserModel & Document) {
        this.email = model.email, 
        this.id = model._id, 
        this.name = model.name
    }
}