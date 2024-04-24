import createHttpError from "http-errors";
import Joi from "joi";
import { roleMessage } from "./role.message.js";

export const addRoleValidation = Joi.object({
    title : Joi.string().min(2).max(30).error(createHttpError.BadRequest(roleMessage.TITLE_ERROR_VALIDATION)),
    //permissions :Joi.array().items(Joi.string().error(createHttpError.BadRequest(roleMessage.PERMISSIONS_ERROR_VALIDATION)))
    permissions :Joi.allow()

})