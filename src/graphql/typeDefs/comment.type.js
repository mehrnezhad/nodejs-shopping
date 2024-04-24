import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { authorType } from "./public.type.js";

export const answerOfComment = new GraphQLObjectType({
    name: 'answerOfComment',
    fields: {
        comment: { type: GraphQLString },
        user: { type: authorType },
        show: { type: GraphQLBoolean }
    }
})


export const CommentTypeList = new GraphQLObjectType({
    name: 'CommentTypeList',
    fields: {
        comment: { type: GraphQLString },
        user: { type: authorType },
        answers: { type: new GraphQLList(answerOfComment) },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean }
    }
})