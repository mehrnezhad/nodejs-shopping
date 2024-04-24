import { GraphQLList, GraphQLString } from "graphql";
import { productType } from "../typeDefs/product.type.js";
import { productModel } from "../../module/product/product.model.js";

export const productResolver = {
    type : new GraphQLList(productType),
    args : {
        category : { type: GraphQLString}
     },
    resolve : async(_,args)=>{
       const {category} = args
       const query = category ? {category} : {}
        return await productModel.find(query).populate([{path: 'supplier'},{path: 'category'}])
    }
}