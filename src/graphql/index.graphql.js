import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { blogResolver } from "./queries/blog.resolver.js";
import { productResolver } from "./queries/product.resolver.js";
import { categoryChildResolver, categoryResolver } from "./queries/category.resolver.js";
import { courseResolver } from "./queries/course.resolver.js";
import { createCommentForCourseResolver, createCommentForProductResolver, createCommentResolver } from "./mutations/comment.resolver.js";
import { likeBlogResolver, likeCourseResolver, likeProductResolver } from "./mutations/like.resolver.js";
import { dislikeForBlogResolver, dislikeForCourseResolver, dislikeForProductResolver } from "./mutations/dislike.resolver.js";
import { bookmarkBlogResolver, bookmarkCourseResolver, bookmarkProductResolver } from "./mutations/bookmark.resolver.js";
import { bookmarkBlogForUserResolver, bookmarkCourseForUserResolver, bookmarkProductForUserResolver, userBasketResolver } from "./queries/user-profile.resolver.js";
import { addCourseToBasketResolver, addProductToBasketResolver, removeCourseFromBasketResolver, removeProductFromBasketResolver } from "./mutations/basket.resolver.js";

const RootQuery = new GraphQLObjectType({
    name: "query",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        categories: categoryResolver,
        childOfCategory: categoryChildResolver,
        course: courseResolver,
        bookmarkBlogUser: bookmarkBlogForUserResolver,
        bookmarkCourseUser: bookmarkCourseForUserResolver,
        bookmarkProductUser: bookmarkProductForUserResolver,
        userBasket: userBasketResolver
    }
})

const RootMutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        createComment: createCommentResolver,
        createCommentForCourse: createCommentForCourseResolver,
        createCommentForProduct: createCommentForProductResolver,
        likeProduct: likeProductResolver,
        likeBlog: likeBlogResolver,
        likeCourse: likeCourseResolver,
        dislikeBlog: dislikeForBlogResolver,
        dislikeCourse: dislikeForCourseResolver,
        dislikeProduct: dislikeForProductResolver,
        bookmarkBlog: bookmarkBlogResolver,
        bookmarkProduct:bookmarkProductResolver,
        bookmarkCourse:bookmarkCourseResolver,
        addProductToBasket: addProductToBasketResolver,
        addCourseToBasket: addCourseToBasketResolver,
        removeProductFromBasket: removeProductFromBasketResolver,
        removeCourseFromBasket: removeCourseFromBasketResolver

    }
})

export const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

