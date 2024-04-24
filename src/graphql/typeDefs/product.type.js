import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { authorType, PublicCategoryType } from "./public.type.js";
export const productType = new GraphQLObjectType({
    name : 'productType',
    fields : {
        title : {type: GraphQLString},
        slug: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesUrl:{type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        supplier:{type: authorType},
        meta_title:{type: GraphQLString},
        meta_description:{type: GraphQLString},
        canonical:{type: GraphQLString},
        likes: {type : new GraphQLList(authorType)},
        deslikes: {type : new GraphQLList(authorType)},
        bookmarks: {type : new GraphQLList(authorType)},
    }
})
