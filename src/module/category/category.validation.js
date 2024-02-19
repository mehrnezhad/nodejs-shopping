import Joi from "joi";
import { categoryMessage } from "./category.message.js";

export const categoryCreateValidation = Joi.object({
 title: Joi.string().trim().min(3).error(new Error(categoryMessage.CategoryRequired))

})

