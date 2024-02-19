import Joi from "joi";
import { authMessage } from "./auth.message.js";
export const SentOtpSchema = Joi.object({
    mobile : Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/).error(new Error(authMessage.OTP_ERROR_MOBILE_VALIDATION))
})

export const checkOtpSchemaValidation = Joi.object({
    mobile : Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/).error(new Error(authMessage.OTP_ERROR_MOBILE_VALIDATION)),
    code : Joi.string().trim().length(5).error(new Error(authMessage.OTP_ERROR_CODE_VALIDATION))
})

