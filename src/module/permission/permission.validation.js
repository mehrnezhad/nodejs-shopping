import createHttpError from "http-errors";
import Joi from "joi";

export const addPermissionValidator = Joi.object({
    title : Joi.string().min(2).max(30).error(createHttpError.BadRequest('عنوان دسترسی الزامی می باشد')),
    description: Joi.allow()
})