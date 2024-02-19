import createHttpError from "http-errors";
import Joi from "joi";
export const blogValidationSchema = Joi.object({

    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest('وارد کردن عنوان مقاله الزامی می باشد')),
    short_desc : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن خلاصه مطلب الزامی می باشد')),
    description : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن توضیحات الزامی می باشد')),
    category : Joi.string().error(createHttpError.BadRequest('وارد کردن دسته بندی الزامی می باشد')),
    image: Joi.allow(),
    author:Joi.allow(),
    slug: Joi.allow()
})