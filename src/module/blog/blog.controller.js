import autoBind from "auto-bind"
import { blogService } from "./blog.service.js"
import { blogMessage } from "./blog.message.js"
import { blogValidationSchema } from "./blog.validation.js"
import { deleteFile } from "../../common/utils/functions.js"
import path from "path"
import { StatusCodes } from "http-status-codes"
class BlogController {
    #service
    constructor() {
        autoBind(this)
        this.#service = blogService
    }
    async create(req, res, next) {
        try {
            
          
            const { title, slug , category, description, short_desc, meta_title , meta_description, canonical } = req.body
           
            const filePathUpload = req.body.filePathUpload
            const filename = req.body?.filename

            const image = filename ? path.join(filePathUpload, filename)?.replace(/\\/g, '/') : ''
            req.body.image = image
            const author = req.user._id
            const validateData = await blogValidationSchema.validateAsync({ title, slug, category, description, short_desc, author, image,meta_title, meta_description, canonical  })
            const blog = await this.#service.create(validateData)

            res.status(200).json({
                validateData,
                message: blogMessage.created
            })

        } catch (error) {
            deleteFile(req.body.image)
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const blogs = await this.#service.getAll()
            res.status(200).json({
                blogs,

            })

        } catch (error) {
            next(error)
        }
    }

    async getOneBlog(req, res, next) {
        try {
            const { id } = req.params
            const blog = await this.#service.getOneBlog(id)
            res.status(200).json({
                blog
            })

        } catch (error) {
            next(error)
        }
    }

    async getblogWithSlug(req,res,next){
        try {
            const {slug} = req.params
            const blog = await this.#service.getblogWithSlug(slug)
            res.status(200).json({
                blog
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteBlog(req, res, next) {
        try {
            const result = await this.#service.deleteBlog(req.params.id);
            res.status(200).json({
                statusCode: 200,
                message: blogMessage.successDelete
            })
        } catch (error) {
            next(error)
        }
    }

    async updateBlog(req, res, next) {
        try {
            const { id } = req.params
            const filePathUpload = req.body?.filePathUpload
            const filename = req.body?.filename
            if (filePathUpload && filename) {
                req.body.image = path.join(filePathUpload, filename).replace(/\\/g, '/')
            }
            const data = req.body
            
            const nulishList = ["", " ", "0", null, undefined, "bookmarks", "likes", "dislikes", "comments"]

            Object.keys(data).forEach(key => {

                if (nulishList.includes(data[key])) delete data[key]
                if (typeof data[key] === "string") data[key] = data[key].trim()
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
            })

            
            const result = await this.#service.updateBlog(id, data)
            return res.status(200).json({
                message: blogMessage.successUpdate,
                result
            })
        } catch (error) {
            deleteFile(req?.body?.image)
            next(error)
        }
    }

    async getBlogWithCategory(req,res,next){
        const {slug} = req.params
        const {page} = req.query
        
        try {
            const blogs = await this.#service.getBlogsWithCategory(slug , page)
            res.status(200).json({
                blogs

            })
        } catch (error) {
            next(error)
        }
    }

    async createComment(req,res,next){
        try {
            const {id} = req.params
        //    const {comment , parent } = req.body
            console.log(req.body)
            const {userId} = req.user._id
            const createComment =await this.#service.createComment({...req.body , user :userId} , id)
            return res.status(StatusCodes.CREATED).json({
                statusCode : StatusCodes.CREATED,
                data :{
                    createComment
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async createAnswer(req,res,next){
        try {
           const {id , commentID } = req.params
           const userID = req.user._id
           const answer = await this.#service.createAnswer({...req.body , user: userID}, id , commentID)
           return res.json({
            statusCode : StatusCodes.CREATED,
            data :{
                answer
            }
           })      
        } catch (error) {
            next(error)
        }
    }
}

export const blogController = new BlogController()