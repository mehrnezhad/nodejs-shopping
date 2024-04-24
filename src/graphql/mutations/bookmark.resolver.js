import { GraphQLString } from "graphql";
import { PublicCreateResponses } from "../typeDefs/public.type.js";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import createHttpError from "http-errors";
import { productModel } from "../../module/product/product.model.js";
import { courseModel } from "../../module/course/course.model.js";

export const bookmarkBlogResolver = {
    type: PublicCreateResponses,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { blogID } = args
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await BlogModel.findOne({ _id: blogID, bookmarks: user._id })
        const updatedQuery = bookmarkList ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
        const bookmarkResult = await BlogModel.updateOne({ _id: blogID }, updatedQuery)
        if (!bookmarkResult.modifiedCount) throw new createHttpError.InternalServerError('something went wrong')
        let message 
        if(bookmarkList) message = 'بلاگ از لیست علاقه مندی ها حذف شد'
        else message= 'بلاگ به لیست علاقه مندی ها اضافه شد'
        return {
            statuscode: 200,
            message
        }

    }
}



export const bookmarkProductResolver = {
    type: PublicCreateResponses,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { productID } = args
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await productModel.findOne({ _id: productID, bookmarks: user._id })
        const updatedQuery = bookmarkList ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
        const bookmarkResult = await productModel.updateOne({ _id: productID }, updatedQuery)
        if (!bookmarkResult.modifiedCount) throw new createHttpError.InternalServerError('something went wrong')
        let message 
        if(bookmarkList) message = 'محصول از لیست علاقه مندی ها حذف شد'
        else message= 'محصول به لیست علاقه مندی ها اضافه شد'
        return {
            statuscode: 200,
            message
        }

    }
}


export const bookmarkCourseResolver = {
    type: PublicCreateResponses,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { courseID } = args
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await courseModel.findOne({ _id: courseID, bookmarks: user._id })
        const updatedQuery = bookmarkList ? { $pull: { bookmarks: user._id } } : { $push: { bookmarks: user._id } }
        const bookmarkResult = await courseModel.updateOne({ _id: courseID }, updatedQuery)
        if (!bookmarkResult.modifiedCount) throw new createHttpError.InternalServerError('something went wrong')
        let message 
        if(bookmarkList) message = 'دوره از لیست علاقه مندی ها حذف شد'
        else message= 'دوره به لیست علاقه مندی ها اضافه شد'
        return {
            statuscode: 200,
            message
        }

    }
}