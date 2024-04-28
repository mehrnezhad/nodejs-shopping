import { Kind } from "graphql";

function parseObject(valueNode){
    const value = Object.create(null)
    valueNode.fields.forEach(field =>{
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}


function parseValueNode(valueNode){
     switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:    
            return valueNode.value
        case Kind.INT:
        case Kind.BOOLEAN:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
     }
}