import User from '../models/User'
import bcrypt from 'bcrypt'
import tokenService from './tokenService'
import ApiError from '../exceptions/api-error'
import Token from '../models/Token'
import UserDto from '../dtos/userDto'
import transactionService from './transactionService'
import { ProductCartSchema } from '../types/ICart'
import cartService from './cartService'
import Cart from '../models/Cart'
import { Types } from 'mongoose'

class UserService {
    async registration(
        email: string,
        password: string,
        name: string,
        products: ProductCartSchema[] | null
    ) {
        const candidate = await User.findOne({ email })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)

        return (await transactionService.withTransaction(async (session) => {
            const user = await User.create([{ email, password: hashPassword, name }], { session })

            const userDto = new UserDto(user[0])
            const tokens = tokenService.generateTokens({ ...userDto })

            await tokenService.saveToken(userDto.id, tokens.refreshToken, session)

            const cartProducts = await cartService.createCart(userDto.id, products)

            return { ...tokens, user: userDto, cart: cartProducts }
        })) as { refreshToken: string }
    }

    async login(email: string, password: string, products: ProductCartSchema[] | null) {
        const user = await User.findOne({ email })

        if (!user) {
            throw ApiError.BadRequest(`Пользователь с ${email} не найден`)
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if (!isPassEqual) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }

        return (await transactionService.withTransaction(async (session) => {
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({ ...userDto })
            await tokenService.saveToken(userDto.id, tokens.refreshToken, session)
            const cart = await cartService.addProductList(products, userDto.id)
            return { ...tokens, user: userDto, cart }
        })) as { refreshToken: string }
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            console.log('нет токена')
            throw ApiError.UnAutoriseError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFormDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFormDB) {
            console.log('не валиднвй токен')
            throw ApiError.UnAutoriseError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user!)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        const cart = await cartService.getCartProducts(userDto.id)
        return { ...tokens, user: userDto, cart }
    }

    async deleteUser(email: string) {
        const user = await User.findOne({ email })

        if (!user) {
            throw ApiError.BadRequest(`Пользователя ${email} не существует`)
        }

        return await transactionService.withTransaction(async () => {
            await user.deleteOne()
            await Token.deleteOne({ user: user._id })
            await Cart.deleteOne({ userId: user._id })

            return { message: `Пользователь ${email} успешно удален` }
        })
    }

    async auth(id: Types.ObjectId) {
        const user = await User.findOne({ _id: id })

        if (!user) {
            throw ApiError.BadRequest(`Пользователь  не найден`)
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        const cart = await cartService.getCartProducts(id)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto, cart }
    }
}

export default new UserService()
