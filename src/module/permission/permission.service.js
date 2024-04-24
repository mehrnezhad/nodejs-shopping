import autoBind from "auto-bind";
import { permissionModel } from "./permission.model.js";
import createHttpError from "http-errors";
import { permissionMessage } from "./permission.message.js";
class PermissionService {
    #model
    constructor() {
        autoBind(this)
        this.#model = permissionModel
    }

    async createPermission(data) {
        await this.checkExistByTitle(data.title)
        const permission = await this.#model.create(data)
        return permission
    }
    async checkExistByTitle(data) {
        const permission = await this.#model.findOne({ title: data.title })
        if (permission) throw new createHttpError.BadRequest(permissionMessage.PERMISSION_EXISTS)
        return permission
    }

    async checkExistById(id) {
        const permission = await this.#model.findOne({ _id: id })
        if (!permission) throw new createHttpError.BadRequest(permissionMessage.PERMISSION_NOT_FOUND)
        return permission
    }
    async getList(search) {
        const queryObject = {}
        if (search) {
            queryObject["$text"] = { $search: search }
        }
        const permissions = await this.#model.find(queryObject)
        return permissions
    }

    async removePermission(id) {
        await this.checkExistById(id)
        const permission = await this.#model.deleteOne({ _id: id })
        if (!permission.deletedCount) throw new createHttpError.InternalServerError(permissionMessage.PERMISSION_DELETED_FAILED)
        return permission
    }
    async updatePermission(id , data){
        await this.checkExistById(id)
        const permissionResult = await this.#model.updateOne({ _id: id },{ $set : data})
        if (!permissionResult.modifiedCount) throw new createHttpError.InternalServerError(permissionMessage.PERMISSION_MODIFIED_FAILED)
        return permissionResult
    
    }
}

export const permissionService = new PermissionService()