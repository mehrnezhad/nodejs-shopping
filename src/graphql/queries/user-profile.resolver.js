import { GraphQLList } from "graphql";
import { blogType } from "../typeDefs/blog.type.js";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import { CourseType } from "../typeDefs/course.blog.js";
import { courseModel } from "../../module/course/course.model.js";
import { productModel } from "../../module/product/product.model.js";
import { productType } from "../typeDefs/product.type.js";
import { AnyType } from "../typeDefs/public.type.js";
import { userModel } from "../../module/user/user.model.js";
import { getbasketsofUser } from "../../common/utils/functions.js";

export const bookmarkBlogForUserResolver = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await BlogModel.find({ bookmarks: user._id }).populate([
            { path: 'category' },
            { path: 'author' },
            { path: 'likes' },
            { path: 'bookmarks' },
            { path: 'dislikes' }
        ])
        return bookmarkList
    }
}

export const bookmarkCourseForUserResolver = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await courseModel.find({ bookmarks: user._id }).populate([
            { path: 'category' },
            { path: 'teacher' },
            { path: 'likes' },
            { path: 'bookmarks' },
            { path: 'deslikes' }
        ])
        return bookmarkList
    }
}


export const bookmarkProductForUserResolver = {
    type: new GraphQLList(productType),
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const bookmarkList = await productModel.find({ bookmarks: user._id }).populate([
            { path: 'category' },
            { path: 'supplier' },
            { path: 'likes' },
            { path: 'bookmarks' },
            { path: 'deslikes' }
        ])
        return bookmarkList
    }
}

export const userBasketResolver = {
    type: AnyType,
    resolve: async (_, args, context) => {
        const { req } = context
        const user = await AuthorizationByGraphQL(req)
        const basket = await getbasketsofUser(user._id)
        return basket

    }
}


