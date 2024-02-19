import { BlogModel } from "./blog.model.js"
import slugify from 'slugify'
import autoBind from 'auto-bind'
import createHttpError from "http-errors"
import { blogMessage } from "./blog.message.js"
class BlogService {
   #model
   constructor() {
      autoBind(this)
      this.#model = BlogModel
   }

   async create(blogDto) {
    
      blogDto.slug =
         blogDto.slug ? slugify(blogDto.slug, { lower: true })
            :
            slugify(blogDto?.title, { lower: true })

      await this.checkExistsSlug(blogDto.slug)
      const blog = await this.#model.create(blogDto)
      return blog
   }

   async getAll() {
      const blogs = await this.#model.aggregate([
         {
            $match: {}
         },
         {
            $lookup: {

               from: "users",
               localField: "author",
               foreignField: "_id",
               as: "author"
            }
         },
         {
            $lookup: {

               from: "categories",
               localField: "category",
               foreignField: "_id",
               as: "category"
            }
         },
         {
            $project : {

               "author._id" : 0,
               "author.verifiedMobile" : 0,
               "author.otp" : 0,
               "author.createdAt": 0,
               "author.updatedAt": 0,
               "author.roles": 0,
               "category._id": 0,
               "category.createdAt": 0,
               "category.updatedAt": 0

            }
         },

         {
            $unwind: "$author"
            
         },
         {
            $unwind: "$category"
            
         }
      ])
      return blogs
   }
   async checkExistsSlug(slug) {

      const blog = await this.#model.findOne({ slug })
  
      if (blog) { throw new createHttpError.BadRequest(blogMessage.existsBySlug) }
      return blog
   }

   async getOneBlog(id){
     const blog = await this.#model.findById(id).populate([{path: "author" , select : {mobile : 1}} , {path: "category" , select: {title: 1 , children: 0}}])
     if(!blog){ throw new createHttpError.NotFound(blogMessage.checkExistbyid)}
     return blog
   }


   async deleteBlog(id){
     await this.getOneBlog(id)
     const result = await this.#model.deleteOne({_id : id})
     if(result.deletedCount ==0 ){ throw new createHttpError.BadRequest(blogMessage.errorDeleted)}
     return result;
   }

   async updateBlog(id , blogdata){
   
      blogdata.slug =
      blogdata.slug ? slugify(blogdata.slug, { lower: true })
         :
         slugify(blogdata?.title, { lower: true })

       const result = await this.#model.updateOne({_id: id}, {$set: blogdata})
       if(result.modifiedCount == 0 ){ throw new createHttpError.BadRequest(blogMessage.errorUpdate)}
       return result 
   }
}
export const blogService = new BlogService()