import createHttpError from "http-errors"
import { roleModel } from "../../module/role/role.model.js"
import { permissionModel } from "../../module/permission/permission.model.js"
import { PERMISSIONS } from "../functions/constant.js"

const checkpermissions = (requiredPermissions = []) => {
    return async function (req, res, next) {
        try {
            const user = req?.user
            const flatPermissions = requiredPermissions.flat(2)
            const role = await roleModel.findOne({ title: user.role })
            const permissions = await permissionModel.find({ _id: { $in: role.permissions } })
            const userPermissions = permissions?.map(item => item.title)
            const hasPermission = flatPermissions.every(permission => {
                return userPermissions.includes(permission)
            })
            if (userPermissions.includes(PERMISSIONS.ALL)) next()
            if (requiredPermissions.length == 0 || hasPermission) {
                next()
            } else {
                throw new createHttpError.Forbidden('شما مجاز به دیدن این صفحه نیستید')
            }
        } catch (error) {
            next(error)
        }
    }

}
export default checkpermissions