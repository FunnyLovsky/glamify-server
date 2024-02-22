import jwt, { JwtPayload } from "jsonwebtoken"
import Token from "../models/Token";
import { Types } from "mongoose";
import { IUser } from "../dtos/userDto";

class TokenService {
    generateTokens(payload: IUser) {
        // payload = JSON.parse(JSON.stringify(payload));
        
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY!, {expiresIn: '10m'});
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

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await Token.findOne({user: userId});

        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }

        const token = await Token.create({user: userId, refreshToken});
        return token;
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