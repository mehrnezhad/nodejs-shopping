import { GraphQLList, GraphQLString } from "graphql";
import { blogType } from "../typeDefs/blog.type.js";
import { BlogModel } from "../../module/blog/blog.model.js";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";

export const blogResolver = {
    type: new GraphQLList(blogType),
    args : {
       category : { type: GraphQLString}
    },
    resolve: async (_,args) => {

            const {category}= args
            const query = category ? {category} : {}

             //   const user = await AuthorizationByGraphQL(req,res)
            return await BlogModel.find(query).populate([{path: 'author'},{path: 'category'}])

             //  const blogs = await BlogModel.aggregate([
        //     {
        //         $match: {}
        //     },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "author",
        //             foreignField: "_id",
        //             as: "author"
        //         }
        //     },
        //     {
        //         $lookup: {

        //             from: "categories",
        //             localField: "category",
        //             foreignField: "_id",
        //             as: "category"
        //         }
        //     },
        //     {
        //         $project: {

        //             "author._id": 0,
        //             "author.verifiedMobile": 0,
        //             "author.otp": 0,
        //             "author.createdAt": 0,
        //             "author.updatedAt": 0,
        //             "author.roles": 0,
        //             "category._id": 0,
        //             "category.createdAt": 0,
        //             "category.updatedAt": 0

        //         }
        //     },

        //     {
        //         $unwind: "$author"

        //     },
        //     {
        //         $unwind: "$category"

        //     }
        // ])
        // return blogs
     
    }
}