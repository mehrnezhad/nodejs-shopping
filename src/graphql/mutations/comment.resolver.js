import { GraphQLString } from "graphql";
import { PublicCreateResponses } from "../typeDefs/public.type.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import { StatusCodes } from "http-status-codes";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { copyObject } from "../../common/utils/functions.js";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { courseModel } from "../../module/course/course.model.js";
import { productModel } from "../../module/product/product.model.js";

export const createCommentResolver = {

    type: PublicCreateResponses,
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const { comment, blogID, parent } = args
        await checkExistByBlog(blogID)
        if (!parent) {
            await BlogModel.updateOne({ _id: blogID }, {
                $push: {
                    comments: {
                        comment,
                        show: false,
                        user: user._id,
                        openToComment: true
                    }
                }
            })
        } else if (parent && mongoose.isValidObjectId(parent)) {

            await BlogModel.updateOne({ _id: blogID, "comments._id": parent }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        show: false,
                        user: user._id
                    }
                }
            })

        }
        
        return {
            statusCode: StatusCodes.CREATED,
            message: "Comment created successfully"
        }
    }
}

export const createCommentForCourseResolver = {

    type: PublicCreateResponses,
    args: {
        comment: { type: GraphQLString },
        courseID: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const { comment, courseID, parent } = args
        await checkExistByCourse(courseID)
        if (!parent) {
            await courseModel.updateOne({ _id: courseID }, {
                $push: {
                    comments: {
                        comment,
                        show: false,
                        user: user._id,
                        openToComment: true
                    }
                }
            })
        } else if (parent && mongoose.isValidObjectId(parent)) {
            await courseModel.updateOne({ _id: courseID, "comments._id": parent }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        show: false,
                        user: user._id
                    }
                }
            })

        }
        
        return {
            statusCode: StatusCodes.CREATED,
            message: "Comment created successfully"
        }
    }
}

export const createCommentForProductResolver = {

    type: PublicCreateResponses,
    args: {
        comment: { type: GraphQLString },
        productID: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const { comment, productID, parent } = args
        await checkExistByProduct(productID)
        if (!parent) {
            await productModel.updateOne({ _id: productID }, {
                $push: {
                    comments: {
                        comment,
                        show: false,
                        user: user._id,
                        openToComment: true
                    }
                }
            })
        } else if (parent && mongoose.isValidObjectId(parent)) {
            await productModel.updateOne({ _id: productID, "comments._id": parent }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        show: false,
                        user: user._id
                    }
                }
            })

        }
        
        return {
            statusCode: StatusCodes.CREATED,
            message: "Comment created successfully"
        }
    }
}

const checkExistByBlog = async (id) => {
    const blog = await BlogModel.findById(id)
    if (!blog) throw new Error("Blog not found")
    return blog

}

const checkExistByCourse = async (id) => {
    const course = await courseModel.findById(id)
    if (!course) throw new Error("Course not found")
    return course

}
const checkExistByProduct = async (id) => {
    const product = await productModel.findById(id)
    if (!product) throw new Error("Product not found")
    return product

}


const getComment = async (model, id) => {
    const findComment = await model.findOne({ "comments._id": id }, { "comments.$": 1 })
    const comment = copyObject(findComment)
    if (!comment) throw new Error("Comment not found")
    return comment?.comments?.[0]
}
