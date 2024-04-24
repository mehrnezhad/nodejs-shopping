import { GraphQLString } from "graphql";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import createHttpError from "http-errors";
import { PublicCreateResponses } from "../typeDefs/public.type.js";
import { StatusCodes } from "http-status-codes";
import { courseModel } from "../../module/course/course.model.js";
import { productModel } from "../../module/product/product.model.js";

export const dislikeForBlogResolver = {
    type: PublicCreateResponses,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { blogId } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const dislikeBlog = await BlogModel.findOne({ _id: blogId, dislikes: user._id })
        const likeBlog = await BlogModel.findOne({ _id: blogId, likes: user._id })

        const updatedQuery = dislikeBlog ? { $pull: { dislikes: user._id } } : { $push: { dislikes: user._id } }
        const dislikeQuery = await BlogModel.updateOne({ _id: blogId }, updatedQuery)
        if (!dislikeQuery.modifiedCount) throw new createHttpError.InternalServerError("something went wrong")
        if (likeBlog && !dislikeQuery) await BlogModel.updateOne({ _id: blogId }, {
            $pull: {
                likes: user._id
            }
        })
        return {
            statusCode: StatusCodes.CREATED,
            message: "success",
        }
    }
}


export const dislikeForCourseResolver = {
    type: PublicCreateResponses,
    args: {
        courseId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { courseId } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const dislikeBlog = await courseModel.findOne({ _id: courseId, deslikes: user._id })
        const likeBlog = await courseModel.findOne({ _id: courseId, likes: user._id })

        const updatedQuery = dislikeBlog ? { $pull: { deslikes: user._id } } : { $push: { deslikes: user._id } }
        const dislikeQuery = await courseModel.updateOne({ _id: courseId }, updatedQuery)
        if (!dislikeQuery.modifiedCount) throw new createHttpError.InternalServerError("something went wrong")
        if (likeBlog && !dislikeQuery) await courseModel.updateOne({ _id: courseId }, {
            $pull: {
                likes: user._id
            }
        })
        return {
            statusCode: StatusCodes.CREATED,
            message: "success",
        }
    }
}


export const dislikeForProductResolver = {
    type: PublicCreateResponses,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { productId } = args
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const dislikeBlog = await productModel.findOne({ _id: productId, deslikes: user._id })
        const likeBlog = await productModel.findOne({ _id: productId, likes: user._id })

        const updatedQuery = dislikeBlog ? { $pull: { deslikes: user._id } } : { $push: { deslikes: user._id } }
        const dislikeQuery = await productModel.updateOne({ _id: productId }, updatedQuery)
        if (!dislikeQuery.modifiedCount) throw new createHttpError.InternalServerError("something went wrong")
        if (likeBlog && !dislikeQuery) await productModel.updateOne({ _id: productId }, {
            $pull: {
                likes: user._id
            }
        })
        return {
            statusCode: StatusCodes.CREATED,
            message: "success",
        }
    }
}