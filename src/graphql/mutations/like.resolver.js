import { GraphQLString } from "graphql";
import { productModel } from "../../module/product/product.model.js";

import { StatusCodes } from "http-status-codes";
import { PublicCreateResponses } from "../typeDefs/public.type.js";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import { courseModel } from "../../module/course/course.model.js";

export const likeProductResolver = {

    type: PublicCreateResponses,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { productID } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
    
        const ProductLike = await productModel.findOne({ _id: productID, likes: user._id })
        const ProductDislike = await productModel.findOne({ _id: productID, dislikes: user._id })
        const updatedQuery = ProductLike ? { $pull: { likes: user._id } } : { $push: { "likes": user._id } }
    
        let updatedProduct = await productModel.updateOne({ _id: productID }, updatedQuery)
        console.log(updatedProduct)

         if (ProductDislike && !ProductLike) {
            await productModel.updateOne({ _id: productID }, { $pull: { dislikes: user._id } })
          }
        return {
            status: StatusCodes.OK,
            message: "success",
        }
    }
}


export const likeBlogResolver = {

    type: PublicCreateResponses,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { blogID } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const blogLike = await BlogModel.findOne({ _id: blogID, likes: user._id })
        const blogDislike = await BlogModel.findOne({ _id: blogID, dislikes: user._id })
        const updatedQuery = blogLike ? { $pull: { likes: user._id } } : { $push: { "likes": user._id } }
         await BlogModel.updateOne({ _id: blogID }, updatedQuery)

         if (blogDislike && !blogLike) {
            await BlogModel.updateOne({ _id: blogID }, { $pull: { dislikes: user._id } })
          }
        return {
            status: StatusCodes.OK,
            message: "success",
        }
    }
}


export const likeCourseResolver = {

    type: PublicCreateResponses,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { courseID } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const blogLike = await courseModel.findOne({ _id: courseID, likes: user._id })
        const blogDislike = await courseModel.findOne({ _id: courseID, dislikes: user._id })
        const updatedQuery = blogLike ? { $pull: { likes: user._id } } : { $push: { "likes": user._id } }
         await courseModel.updateOne({ _id: courseID }, updatedQuery)

         if (blogDislike && !blogLike) {
            await courseModel.updateOne({ _id: courseID }, { $pull: { dislikes: user._id } })
          }
        return {
            status: StatusCodes.OK,
            message: "success",
        }
    }
}

