import autoBind from "auto-bind"
import { roleService } from "./role.service.js"
import { StatusCodes } from "http-status-codes"
import { addRoleValidation } from "./role.validation.js"
import { copyObject } from "../../common/utils/functions.js"
class RoleController {
    #service
    constructor() {
        autoBind(this)
        this.#service = roleService
    }
    async getRoles(req, res, next) {
        try {
            const roles = await this.#service.getRoles()
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async createRole(req, res, next) {
        const data = await addRoleValidation.validateAsync(req.body)
         data.permissions = data?.permissions?.split(',')
         
         const role = await this.#service.createRole(data)
         try {
             return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                  data : {
                     role
                  }
             })
         } catch (error) {
             next(error)
         }
    }

    async removeRole(req,res,next){
        try {
            const {field} = req.params
            const role = await this.#service.removeRole(field)
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    role
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateRole(req,res,next){
        try {
            const {id} = req.params
    
            const data = copyObject(req.body)
            data.permissions = data?.permissions?.split(',')
         
            const roleResult = await this.#service.updateRole(id,data)
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data : {
                    roleResult
                }
            })
       
        } catch (error) {
            next(error)
        }
    }
            
}
export const roleController = new RoleController()