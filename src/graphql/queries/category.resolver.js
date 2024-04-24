import { GraphQLList, GraphQLString } from "graphql";
import { CategoryModel } from "../../module/category/category.model.js";
import { categoryType } from "../typeDefs/category.type.js";


export const categoryResolver = {
    type: new GraphQLList(categoryType),
    resolve: async () => {
        return await CategoryModel.find({ parent: undefined });
    }
}
export const categoryChildResolver = {
    type: new GraphQLList(categoryType),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parent } = args
        return await CategoryModel.find({ parent });
    }
}