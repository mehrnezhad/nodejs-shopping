import { GraphQLInt, GraphQLString } from "graphql";
import { PublicCreateResponses } from "../typeDefs/public.type.js";
import { AuthorizationByGraphQL } from "../../common/middleware/authorization.js";
import { productModel } from "../../module/product/product.model.js";
import { courseModel } from "../../module/course/course.model.js";
import { userModel } from "../../module/user/user.model.js";
import { copyObject } from "../../common/utils/functions.js";
import createHttpError from "http-errors";

export const addProductToBasketResolver = {
    type: PublicCreateResponses,
    args: {
        productID: { type: GraphQLString }

    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { productID } = args
        const user = await AuthorizationByGraphQL(req)
        await checkExistByProduct(productID)
        const product = await getProductFromBasket(productID, user._id)
        let message
        if (product) {

            await userModel.updateOne({ id: user._id, "basket.products.productID": productID }, {
                $inc: {
                    "basket.products.$.count": 1

                }
            })
            message = 'به تعداد محصول در سبد خرید اضافه شد'

        } else {

            const result = await userModel.updateOne({ id: user._id }, {
                $push: {
                    "basket.products": {
                        productID,
                        count: 1
                    }
                }
            })
            message = 'محصول به سبد خرید اضافه شد'
            console.log(result)
        }

        return {
            statusCode: 201,
            message

        }
    }
}

export const addCourseToBasketResolver = {
    type: PublicCreateResponses,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { courseID } = args
        const user = await AuthorizationByGraphQL(req)
        await checkExistByCourse(courseID)
        const course = await getCourseFromBasket(courseID, user._id)
        let message
        if (course) {
             
            throw new createHttpError.InternalServerError('دوره قبلا در سبد خرید اضافه شده است')

        } else {

            await userModel.updateOne({ id: user._id }, {
                $push: {
                    "basket.courses": {
                        courseID,
                        count: 1
                    }
                }
            })
            message = 'دوره به سبد خرید اضافه شد'

        }

        return {
            statusCode: 201,
            message

        }
    }
}



export const removeProductFromBasketResolver = {
    type: PublicCreateResponses,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { productID } = args
        const user = await AuthorizationByGraphQL(req)
        await checkExistByProduct(productID)
        const findProduct = await getProductFromBasket(productID, user._id)
        if (!findProduct) throw new createHttpError.InternalServerError('product Not Found')
        let message
        if (findProduct.count > 1) {
            await userModel.updateOne({ _id: user._id, "basket.products.productID": productID }, {
                $inc: {
                    "basket.products.$.count": -1
                }
            })
            message = 'محصول از سبد خرید کم شد'
        } else {
            await userModel.updateOne({ _id: user._id }, {
                $pull: {
                    "basket.products": {
                        productID
                    }
                }
            })
            message = 'محصول از سبد خرید پاک شد'
        }
        
        return {
            statusCode: 200,
            message

        }
    }
}



export const removeCourseFromBasketResolver = {
    type: PublicCreateResponses,
    args: {
        courseID: { type: GraphQLString },
    
    },
    resolve: async (_, args, context) => {
        const { req } = context
        const { courseID } = args
        const user = await AuthorizationByGraphQL(req)
        await checkExistByCourse(courseID)
        const findCourse = await getCourseFromBasket(courseID, user._id)
        if (!findCourse) throw new createHttpError.InternalServerError('course Not Found')
        let message
        if (findCourse.count > 1) {
            await userModel.updateOne({ _id: user._id, "basket.courses.courseID": courseID }, {
                $inc: {
                    "basket.courses.$.count": -1
                }
            })
            message = 'دوره از سبد خرید کم شد'
        } else {
            await userModel.updateOne({ _id: user._id }, {
                $pull: {
                    "basket.courses": {
                        courseID
                    }
                }
            })
            message = 'دوره از سبد خرید پاک شد'
        }
        
        return {
            statusCode: 200,
            message

        }
   
    }
}





const checkExistByCourse = async (id) => {
    const course = await courseModel.findById(id)
    if (!course) throw new Error("Course not found")
    return course

}
const checkExistByProduct = async (id) => {
    const product = await productModel.findById(id)
    if (!product) throw new Error("Product not found")
    return product

}

const getProductFromBasket = async (productID, userID) => {
    const result = await userModel.findOne({ _id: userID, "basket.products.productID": productID }, { "basket.products.$": 1 })
    const resultObject = copyObject(result)

    return resultObject?.basket?.products?.[0]
}


const getCourseFromBasket = async (courseID, userID) => {
    const result = await userModel.findOne({ _id: userID, "basket.courses.courseID": courseID }, { "basket.courses.$": 1 })
    const resultObject = copyObject(result)
    return resultObject?.basket?.courses?.[0]
}