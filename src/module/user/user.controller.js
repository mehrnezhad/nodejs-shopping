import autoBind from "auto-bind"
import { userService } from "./user.service.js"
import { StatusCodes } from "http-status-codes"


class UserController {
    #service
    constructor() {
        this.#service = userService
        autoBind(this)
    }
    async getAllList(req, res, next) {
        try {
            const { search } = req.query
            const users = await this.#service.getAllUsers(search)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req,res,next){
        try {
            const userId = req.user?._id;
            const data = req.body
            const userUpdate = await this.#service.updateUser(userId,data);
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    userUpdate
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getProfile(req,res,next){
        try {
            const user = req.user
            const userProfile = await this.#service.getProfile(user._id)
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    userProfile
                }
            })
        
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController()