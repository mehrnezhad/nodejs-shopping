import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PublicCategoryType } from "./public.type.js";

export const categoryType = new GraphQLObjectType({
    name : 'categoryType',
    fields : {
        title : {type: GraphQLString},
        children: {type: new GraphQLList(PublicCategoryType)}
    }
})