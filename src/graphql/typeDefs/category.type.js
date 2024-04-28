import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { AnyType, PublicCategoryType } from "./public.type.js";

export const categoryType = new GraphQLObjectType({
    name : 'categoryType',
    fields : {
        _id: {type: GraphQLString},
        title : {type: GraphQLString},
        children: {type: new GraphQLList(AnyType)}
    }
})