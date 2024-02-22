import { Schema, model } from "mongoose";

const UserShema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
})

export default model('User', UserShema)