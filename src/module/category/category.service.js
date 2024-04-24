import autoBind from "auto-bind"
import { CategoryModel } from "./category.model.js"
import { Types, isValidObjectId } from "mongoose"
import slugify from "slugify"
import createHttpError from "http-errors"
import { categoryMessage } from "./category.message.js"
class CategoryService {
    #model
    constructor() {
        autoBind(this)
        this.#model = CategoryModel
    }

    async create(categoryDto) {
        let slug
        //check slug
        categoryDto?.slug
            ?
            slug = slugify(categoryDto?.slug, { lower: true })
            :
            slug = slugify(categoryDto?.title, { lower: true })

        await this.checkExistsSlug(slug)
        categoryDto.slug = slug

        if (categoryDto?.parent && isValidObjectId(categoryDto?.parent)) {
            const existCategory = await this.checkExistsCategoryById(categoryDto.parent)
            categoryDto.parent = existCategory._id
            categoryDto.parents = [
                ...new Set(
                    ([existCategory._id].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )

            ]

        }

        const category = await this.#model.create(categoryDto)
        return category
    }

    async getAll() {
        return await this.#model.find({ parent: undefined })
    }

    async checkExistsSlug(slug) {
        const categorySlug = await this.#model.findOne({ slug })
        if (categorySlug) { throw new createHttpError.Conflict(categoryMessage.SlugAlreadyExists) }
        return null
    }

    async checkExistsCategoryById(id) {
        const category = await this.#model.findById(id)
        if (!category) { throw new createHttpError.NotFound(categoryMessage.CategoryNotFound) }
        return category
    }


    async getCategoryWithSlug(slug) {

        const category = await this.#model.findOne({ slug })
        if (!category) { throw new createHttpError.NotFound(categoryMessage.CategoryNotFound) }
        return category

    }

    async getChildrenCategory(parent) {
        const category = await this.#model.find({ parent })
        return category
    }

    async deleteCategory(id) {
        const category = await this.checkExistsCategoryById(id)
        const result = await this.#model.deleteMany({
            $or: [
                { _id: category._id },
                { parent: category._id }
            ]

        })
        if (result.deletedCount === 0) throw new createHttpError.BadRequest(categoryMessage.categoryFailedDelete)

    }
    async updateCategory(categoryDto) {
        const category = await this.checkExistsCategoryById(categoryDto.id)
        let updatedCategory;
        if (categoryDto?.parent && isValidObjectId(categoryDto?.parent)) {
        updatedCategory =  await this.#model.updateOne({_id : categoryDto.id},{
                $set:{
                  parent : categoryDto?.parent,
                  parents: category?.parents?.map(item => (item == category?.parent ? categoryDto?.parent : item)),
                  title :  categoryDto?.title,
                  icon :  categoryDto?.icon,
                  slug :  categoryDto?.slug,
                  meta_title: categoryDto?.meta_title, 
                  meta_description: categoryDto?.meta_description, 
                  canonical: categoryDto?.canonical
                }
             })
        }else{
            updatedCategory=await this.#model.updateOne({_id : categoryDto.id},{
                $set:{
                  title :  categoryDto?.title,
                  icon :  categoryDto?.icon,
                  slug :  categoryDto?.slug,
                  meta_title: categoryDto?.meta_title, 
                  meta_description: categoryDto?.meta_description, 
                  canonical: categoryDto?.canonical
                }
             })
        }
        if(updatedCategory.modifiedCount==0){ throw new createHttpError.BadRequest(categoryMessage.CategoryNotFound)}
        return updatedCategory
    }
}

export const categoryService = new CategoryService()
