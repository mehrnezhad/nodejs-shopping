import Joi from 'joi'
import createHttpError from 'http-errors'
export const courseValidationSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest('وارد کردن عنوان دوره الزامی می باشد')),
    slug: Joi.allow(),
    short_text : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن خلاصه دوره الزامی می باشد')),
    text : Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن توضیحات الزامی می باشد')),
    category : Joi.string().error(createHttpError.BadRequest('وارد کردن دسته بندی الزامی می باشد')),
    price: Joi.allow(),
    type:Joi.allow(),
    tags: Joi.string().error(createHttpError.BadRequest('وارد کردن  تگ الزامی می باشد')),
    filePathUpload: Joi.allow(),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest('فرمت تصویر صحیح نمی باشد')),
    meta_title: Joi.string().min(3).error(createHttpError.BadRequest('وارد کردن عنوان صفحه الزامی می باشد')),
    meta_description: Joi.string().min(10).error(createHttpError.BadRequest('وارد کردن متای توضیحات الزامی می باشد')),
    canonical: Joi.allow()
})

export const episodeValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50).error(createHttpError.BadRequest('عنوان دوره الزامی می باشد')),
    text: Joi.string().error(createHttpError.BadRequest('توضیحات دوره الزامی می باشد')),
    type: Joi.string().regex(/(lock|unLock)/i),
    chapterID: Joi.string().error(createHttpError.BadRequest('وارد کردن شناسه فصل الزامی می باشد')),
    courseID: Joi.string().required().error(createHttpError.BadRequest('وارد کردن شناسه دوره الزامی می باشد')),
    filePathUpload: Joi.allow(),
    filename:Joi.string().pattern(/(\.mp4|\.avi|\.mpg|\.mov|\.mkv)$/).error(createHttpError.BadRequest('فرمت ویدیو صحیح نمی باشد')),
 
})
  

export const chapterValidationSchema = Joi.object({
    title : Joi.string().min(2).error(createHttpError.BadRequest('وارد کردن عنوان فصل الزامی می باشد'))
})