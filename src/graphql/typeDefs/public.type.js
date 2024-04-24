import { GraphQLObjectType, GraphQLString } from "graphql";

export const authorType = new GraphQLObjectType({
    name: 'autorType',
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        mobile: { type: GraphQLString }
    }
})

export const PublicCategoryType = new GraphQLObjectType({
    name: 'PublicCategoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString }
    }
}) 

export const PublicCreateResponses= new GraphQLObjectType({
    name : 'PublicCreateResponses',
    fields : {
        statusCode : {type : GraphQLString},
        message: {type: GraphQLString}
    }
})