import User from "../models/User"
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import tokenService from "./tokenService";
import ApiError from "../exceptions/api-error";
import Token from "../models/Token";
import UserDto from "../dtos/userDto";
import transactionService from "./transactionService";
import { ProductCartSchema } from "../types/ICart";
import cartService from "./cartService";


class UserService {
    async registration(email: string, password: string, name: string, products: ProductCartSchema) {
        const candidate = await User.findOne({email});

        if(candidate) {
            throw ApiError.BadRequest(`Пользователь с ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);

        return await transactionService.withTransaction(async () => {
            const user = await User.create({email, password: hashPassword, name});

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            const cartProducts = await cartService.createCart(userDto.id, products);
            
            return { ...tokens, user: userDto, cart: cartProducts } 
        }) as {refreshToken: string}
    }

    async login(email: string, password: string) {
        const user = await User.findOne({email});

        if(!user) {
            throw ApiError.BadRequest(`Пользователь с ${email} не найден`)
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password);

        if(!isPassEqual) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            console.log('нет токена');
            throw ApiError.UnAutoriseError();
            
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFormDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFormDB) {
            console.log('не валиднвй токен');
            throw ApiError.UnAutoriseError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user!);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = await User.find();

        if(!users.length) {
            throw ApiError.BadRequest('Пользователи отсутствуют')
        }

        return users;
    }

    async deleteUser(email: string) {
        const user = await User.findOne({email});

        if(!user) {
            throw ApiError.BadRequest(`Пользователя ${email} не существует`)
        }
        
        await user.deleteOne()
        await Token.deleteOne({user: user._id})

        return {message: `Пользователь ${email} успешно удален`}

        // await User.deleteMany()
        // await Token.deleteMany();
        // return {message: `Все очищено`}
    }
}

export default new UserService()