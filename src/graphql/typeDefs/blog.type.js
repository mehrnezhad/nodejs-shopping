import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { authorType, PublicCategoryType } from "./public.type.js";
import { CommentTypeList } from "./comment.type.js";

export const blogType = new GraphQLObjectType({
    name : 'blogType',
    fields:{
        title : {type : GraphQLString},
        slug : {type : GraphQLString},
        short_desc : {type : GraphQLString },
        description: {type : GraphQLString},
        image : {type : GraphQLString },
        tags : {type : new GraphQLList(GraphQLString)},
        author : {type : authorType},
        category : {type: PublicCategoryType},
        meta_title: {type:GraphQLString},
        meta_description:{type:GraphQLString },
        canonical:{type: GraphQLString},
        comments: {type : new GraphQLList(CommentTypeList)},
        likes : {type: new GraphQLList(authorType)}
    }
})