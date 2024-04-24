import autoBind from "auto-bind"
import { userModel } from "./user.model.js"
import createHttpError from "http-errors"
import { userMessage } from "./user.message.js"
class UserService {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }
    async getAllUsers(search) {
        let objectQuery = {}
        if(search) objectQuery['$text'] = {$search : search}
        return await this.#model.find(objectQuery)
    }
    async updateUser(userId,data){
        const userUpdated = await this.#model.updateOne({_id : userId} , {
            $set : data
        })
        if(!userUpdated.modifiedCount) throw new createHttpError.BadRequest(userMessage.User_Update_Not_Successfull)
        return userUpdated
    }
    async getProfile(id){
        const user = await this.#model.findById(id)
        if(!user) throw new createHttpError.NotFound(userMessage.USER_NOT_FOUND)
        return user
    }
}
export const userService = new UserService()