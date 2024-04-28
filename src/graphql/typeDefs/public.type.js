import { GraphQLObjectType, GraphQLScalarType, GraphQLString, Kind } from "graphql";


export const AnyType = new GraphQLScalarType({
    name: 'AnyType',
    parseValue: (value) => {

        if (typeof value === 'object') {
            return value
        }
        if(typeof value ==='string' && value.charAt(0)==='{'){
            return JSON.parse(value)
        }
         return null
    },
    serialize : (value)=>{
        
        if (typeof value === 'object') {
            return value
        }
        if(typeof value ==='string' && value.charAt(0)==='{'){
            return JSON.parse(value)
        }
         return null
    },
    parseLiteral : (valueNode)=>{
         switch(valueNode.kind){
            case Kind.STRING: 
              return valueNode.value.charAt(0)==='{' ? JSON.parse(valueNode.value) : valueNode.value
            case Kind.INT:
            case Kind.FLOAT:
              return Number(valueNode.value)
      
         }
    }
})


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



export const PublicCreateResponses = new GraphQLObjectType({
    name: 'PublicCreateResponses',
    fields: {
        statusCode: { type: GraphQLString },
        message: { type: GraphQLString }
    }
})