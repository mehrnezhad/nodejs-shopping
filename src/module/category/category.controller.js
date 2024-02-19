import autoBind from 'auto-bind'
import { categoryService } from './category.service.js'
import { categoryMessage } from './category.message.js'
import { categoryCreateValidation } from './category.validation.js'
class CategoryController {
    #service
    constructor() {
        autoBind(this)
        this.#service = categoryService
    }
    async create(req, res, next) {
        try {
            const { title, slug, icon, parent } = req.body
            await categoryCreateValidation.validateAsync({ title })
            await this.#service.create({ title, slug, icon, parent })
            return res.status(201).json(
                { message: categoryMessage.CreateSuccessfully }
            )

        } catch (error) {
            next(error)
        }

    }
    async getAll(req, res, next) {
        try {
            const categories = await this.#service.getAll()
            return res.status(200).json({
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryWithSlug(req, res, next) {
        try {
            const { slug } = req.params
            const category = await this.#service.getCategoryWithSlug(slug)
            return res.status(200).json({
                category,
            })
        } catch (error) {
            next(error)
        }
    }

    async getChildrenCategory(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.#service.getChildrenCategory(id)
            res.status(200).json({
                category
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params
            await this.#service.deleteCategory(id);
            return res.status(200).json({
                message: categoryMessage.CategoryDeleted
            });
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id } = req.params
            const { title, icon, parent, slug } = req.body
            const updatedCategory = await this.#service.updateCategory({id,title, icon, parent , slug });
            return res.status(200).json({
                updatedCategory,
                message: categoryMessage.CategoryUpdated
            });
        } catch (error) {
            next(error)
        }
    }
}


export const categoryController = new CategoryController()