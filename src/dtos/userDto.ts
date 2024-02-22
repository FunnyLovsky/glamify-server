import { Types } from "mongoose";
import { IUserSchema } from "../types/IUser";

export default class UserDto {
    email: string;
    id: Types.ObjectId;
    name: string
   
    constructor(model: IUserSchema) {
        this.email = model.email, 
        this.id = model._id, 
        this.name = model.name
    }
}