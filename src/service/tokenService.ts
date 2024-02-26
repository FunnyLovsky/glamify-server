import jwt, { JwtPayload } from "jsonwebtoken"
import Token from "../models/Token";
import { ClientSession, Types } from "mongoose";
import { IUser } from "../types/IUser";


class TokenService {
    generateTokens(payload: IUser) {
        // payload = JSON.parse(JSON.stringify(payload));
        
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY!, {expiresIn: '24h'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY!, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY!) as IUser;
            return userData;
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY!) as IUser;
            return userData;
        } catch (error) {
            return null
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string, session?: ClientSession) {
        let tokenData = await Token.findOne({ user: userId }).session(session || null);
    
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        } else {
            const token = await Token.create([{ user: userId, refreshToken }], { session });
            return token[0];
        }
    }
    

    async removeToken(refreshToken: string) {
        await Token.deleteOne({refreshToken});
        return {message: 'Пользователь разлогинился'}
    }

    async findToken(refreshToken: string) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService()