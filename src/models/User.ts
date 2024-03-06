import { Schema, model } from 'mongoose'
import { IUserSchema } from '../types/IUser'

const UserShema = new Schema<IUserSchema>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})

export default model('User', UserShema)
