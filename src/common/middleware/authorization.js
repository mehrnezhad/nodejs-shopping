import createHttpError from "http-errors"
import { authMessage } from "../../module/auth/auth.message.js"
import { JSON_WEBTOKEN_SECRET } from "../../module/auth/auth.constant.js"
import jwt from "jsonwebtoken"
import { userModel } from "../../module/user/user.model.js"
const Authorization = async(req,res,next)=>{
    try {
        const header = req.headers
        const token = header?.authorization?.split(" ")[1]
        if(!token) throw new createHttpError.Unauthorized(authMessage.ACCESSTOKEN_NOT_EXISTS_IN_HEADER)
        const {mobile} = jwt.verify(token,JSON_WEBTOKEN_SECRET)
        const user = await userModel.findOne({mobile},{password:0 , email: 0 , username : 0 ,  otp: 0 , __v : 0 , verifiedMobile : 0}).lean()
        if(!user) throw new createHttpError.Unauthorized(authMessage.ACCESSTOKEN_NOT_EXISTS_IN_HEADER)
        req.user = user
        return next()

    } catch (error) {
        next(error)
    }

}
export default Authorization