import { Schema, model } from 'mongoose'
import { ITokenSchema } from '../types/IToken'

const TokenShema = new Schema<ITokenSchema>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
})

export default model('Token', TokenShema)
