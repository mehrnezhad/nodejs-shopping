import autoBind from "auto-bind"
import { authService } from "./auth.service.js"
import { authMessage } from "./auth.message.js"
import { SentOtpSchema , checkOtpSchemaValidation  } from "./auth.validation.js"

class AuthController {
    #service
    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async sendOtp(req, res, next) {
        try {
            await SentOtpSchema.validateAsync(req.body)
            const { mobile } = req.body
            const user = await this.#service.sendOtp(mobile)
            return res.json({
              
                    message: authMessage.OTP_SEND,
                    otp: user?.otp?.code
                

            })
        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req, res, next) {
        try {
            await checkOtpSchemaValidation.validateAsync(req.body)
            const {mobile , code} = req.body
            const {token,refreshToken}=await this.#service.checkOtp(mobile , code)
            return res.json({
                message : authMessage.TOKEN_CREATE_SUCCESS,
                    token,
                    refreshToken,
                    mobile
                
            })
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req,res,next){
        try {
            const {refreshToken} = req.body
            const {accessToken,newRefreshToken} = await this.#service.refreshToken(refreshToken)

            return res.json({
                data : {
                    accessToken ,
                    refreshToken : newRefreshToken
                
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async check(req,res,next){
        try {
          res.json({
            message : 'ok'
          })
        } catch (error) {
            next(error)
        }
    }


}

export const authController = new AuthController() 