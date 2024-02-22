import { Schema, model } from "mongoose";
import { IUser } from "../dtos/userDto";

export interface IToken {
    user: IUser,
    refreshToken: string
}

const TokenShema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true}
})

export default model('Token', TokenShema)