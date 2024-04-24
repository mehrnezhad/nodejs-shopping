import autoBind from "auto-bind";
import { roleModel } from "./role.model.js";
import createHttpError from "http-errors";
import { roleMessage } from "./role.message.js";
import mongoose from "mongoose";
class RoleService {
    #model
    constructor() {
        autoBind(this)
        this.#model = roleModel
    }
    async getRoles() {
        return await this.#model.find({}).populate([{ path: 'permissions', select: { title: 1 } }])
    }
    async createRole(data) {
        await this.checkExistsByTitle(data.title)
        const role = await this.#model.create(data)
        return role
    }
    async checkExistsByTitle(title) {
        const role = await this.#model.findOne({ title })
        if (role) throw new createHttpError.BadRequest(roleMessage.PERMISSIONS_ERROR_VALIDATION)
        return null
    }

    async checkExistsById(id) {
        const role = await this.#model.findOne({_id: id })
        if (!role) throw new createHttpError.BadRequest(roleMessage.ROLE_NOT_FOUND)
        return role
    }

    async removeRole(field) {
        let queryRole = mongoose.isValidObjectId(field) ? { _id: field } : { title: field }
        const role = await this.#model.findOne(queryRole)
        if (!role) throw new createHttpError.InternalServerError(roleMessage.ROLE_NOT_FOUND)
    
        const deletedRole = await this.#model.deleteOne({ _id: role._id })
        if(!deletedRole.deletedCount) throw new createHttpError.InternalServerError(roleMessage.ROLE_ERROR_DELETED)
        return deletedRole
    }

    
    async updateRole(id,data) {

       await this.checkExistsById(id)

        const updateRole = await this.#model.updateOne({ _id: id },{
            $set : data
        })
        if(!updateRole.modifiedCount) throw new createHttpError.InternalServerError(roleMessage.ROLE_ERROR_UPDATED)
        return updateRole
    }
}
export const roleService = new RoleService()