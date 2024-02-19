import autoBind from "auto-bind"
import { userModel } from "../user/user.model.js"
import createHttpError from "http-errors"
import { authMessage } from "./auth.message.js"
import { randomInt } from "crypto"
import { JSON_WEBTOKEN_SECRET, JSON_REFRESH_TOKEN_SECRET } from "./auth.constant.js"
import redisClient from "../../config/redis.config.js"
import jwt from "jsonwebtoken"
class AuthService {
    #model

    constructor() {
        autoBind(this)
        this.#model = userModel
    }

    async sendOtp(mobile) {
        const now = new Date().getTime()
        const otp = {
            code: randomInt(10000, 90000),
            expiresIN: now + (1000 * 60 * 2)
        }
        const user = await this.checkExistsUser(mobile)
        if (!user) {
            return await this.createNewUser(mobile, otp)
        }

        if (user?.otp && user?.otp?.expiresIN > now) {
            throw new createHttpError.BadRequest(authMessage.OTP_ALREADY)
        }

        user.otp = otp
        await user.save()
        return user
    }

    async checkOtp(mobile, code) {
        const now = new Date().getTime()
        const user = await this.checkExistsUser(mobile)
        if (user.otp?.code != code) { throw new createHttpError.Unauthorized(authMessage.OTP_CODE_INVALIDE) }
        if (user?.otp?.expiresIN < now) { throw new createHttpError.Unauthorized(authMessage.OTP_CODE_EXPIRED) }
        if (!user?.verifiedMobile) {
            user.verifiedMobile = true
        }

        const token = await this.signToken({ mobile })
        const refreshToken = await this.signRefreshToken({ mobile }, mobile)
        return {
            token,
            refreshToken
        }

    }

    async checkExistsUser(mobile) {
        const result = await this.#model.findOne({ mobile })
        return result
    }

    async createNewUser(mobile, otp) {
        return await this.#model.create({
            mobile,
            otp
        })
    }

    async signToken(payload) {
        return jwt.sign(payload, JSON_WEBTOKEN_SECRET, { expiresIn: "1d" })
    }

    async signRefreshToken(payload, userId) {
        const token = jwt.sign(payload, JSON_REFRESH_TOKEN_SECRET, { expiresIn: "1y" })
        await redisClient.SETEX(userId, (365 * 24 * 60 * 60), token)
        return token
    }

    async verifyRefreshToken(token) {
        const { mobile } = jwt.verify(token, JSON_REFRESH_TOKEN_SECRET)
        const user = await this.#model.findOne({ mobile }, { password: 0, email: 0, username: 0, otp: 0, __v: 0, verifiedMobile: 0 })
        if (!user) throw new createHttpError.Unauthorized(authMessage.User_NOT_FOUND)

        const refreshToken = await redisClient.get(mobile)
        if (refreshToken == token) { return mobile }
        throw new createHttpError.Unauthorized(authMessage.ACCESSTOKEN_NOT_EXISTS_IN_HEADER)

    }

    async getUserByMobile(mobile) {
        const user = await this.#model.findOne({ mobile })
        if (!user) throw new createHttpError.NotFound(authMessage.User_NOT_FOUND)
        return user
    }
    async refreshToken(token) {
        const mobile = await this.verifyRefreshToken(token)
        const user = await this.getUserByMobile(mobile)

        const accessToken = await this.signToken({ mobile: user.mobile })
        const newRefreshToken = await this.signRefreshToken({ mobile: user.mobile }, user.mobile)
        return {
            accessToken,
            newRefreshToken

        }

    }
}
export const authService = new AuthService()