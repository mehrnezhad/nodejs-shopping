import autoBind from "auto-bind";
import { permissionService } from "./permission.service.js";
import { StatusCodes } from "http-status-codes";
import { addPermissionValidator } from "./permission.validation.js";
import { copyObject } from "../../common/utils/functions.js";
class PermissionController {
    #service
    constructor() {
        autoBind(this)
        this.#service = permissionService
    }
    async createPermission(req, res, next) {
        try {
            const data = await addPermissionValidator.validateAsync(req.body)
            const permission = await this.#service.createPermission(data)
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    permission
                }

            })
        } catch (error) {
            next(error)
        }

    }
    async getList(req, res, next) {
        try {
            const { search } = req.query
            const permissions = await this.#service.getList(search)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removePermission(req, res, next) {
        try {
            const { id } = req.params
            const result = await this.#service.removePermission(id)
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updatePermission(req, res, next) {
        try {
            const { id } = req.params
            const data = copyObject(req.body)
            const updatePermission = await this.#service.updatePermission(id , data)
            return res.json({
                statusCode: StatusCodes.OK,
                data : {
                    updatePermission
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export const permissionController = new PermissionController()