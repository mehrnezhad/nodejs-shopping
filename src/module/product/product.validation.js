import Joi from "joi"
import createHttpError from "http-errors"
export const productValidationSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest('وارد کردن عنوان محصول الزامی می باشد')),
    slug: Joi.allow(),
    short_text : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن خلاصه محصول الزامی می باشد')),
    text : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن توضیحات الزامی می باشد')),
    category : Joi.string().error(createHttpError.BadRequest('وارد کردن دسته بندی الزامی می باشد')),
    supplier:Joi.allow(),
    price: Joi.number(),
    type:Joi.allow(),
    tags: Joi.allow(),
    width: Joi.allow(),
    height: Joi.allow(),
    length: Joi.allow(),
    weight: Joi.allow(),
    color: Joi.string().min(0).max(30).error(createHttpError.BadRequest('وارد کردن رنگ محصولات الزامی می باشد')),
    filePathUpload: Joi.allow(),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest('فرمت تصویر صحیح نمی باشد')),
    meta_title: Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن عنوان صفحه الزامی می باشد')),
    meta_description: Joi.string().min(10).error(createHttpError.BadRequest('وارد کردن متای توضیحات الزامی می باشد')),
    canonical: Joi.allow()
})
  


