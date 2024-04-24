import autoBind from "auto-bind"
import { productService } from "./product.service.js"
import { productValidationSchema } from "./product.validation.js"
import { deleteFile } from "../../common/utils/functions.js"
import { imagesReqBody, setFeatures } from "./product.function.js"
import { prodctNullish, productMessage } from "./product.message.js"
import { StatusCodes } from 'http-status-codes'
import { copyObject } from "./product.function.js"
class ProductController {
    #service
    constructor() {
        autoBind(this)
        this.#service = productService
    }
    async add(req, res, next) {
        try {
            const productData = await productValidationSchema.validateAsync(req.body)

            const filePathUpload = req.body?.filePathUpload

            req.body.image = imagesReqBody(req?.files || [], filePathUpload)

            productData.images = req.body.image
            productData.slug = productData.slug ?? productData.title.replace(" ", "-")
            let features = {}
            features.color = productData.color
            if (!isNaN(productData.width)) features.width = productData.width
            if (!isNaN(productData.weight)) features.weight = productData.weight
            if (!isNaN(productData.length)) features.length = productData.length
            if (!isNaN(productData.height)) features.height = productData.height
            productData.features = features


            productData.supplier = req.user._id
            const result = await this.#service.addProduct(productData)
            return res.status(StatusCodes.CREATED).json({
                data: result,
                statusCode: StatusCodes.CREATED
            })
        } catch (error) {
            deleteFile(req.body.image)
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            const {id} = req.params
            const data = copyObject(req.body)
            data.images = imagesReqBody(req.files || [], req.body?.filePathUpload)
            data.features = setFeatures(req.body)
            data.slug = data.slug ?? data?.title?.replace(" ", "-") ?? ''
            const nulishList = Object.values(prodctNullish)
        
            Object.keys(data).forEach(key => {
                if(nulishList.includes(data[key])){ delete data[key]}
                 if(typeof data[key]=='string') { data[key] = data[key].trim()}
                 if(Array.isArray(data[key]) && data[key].length >0){ data[key] = data[key].map(item => item.trim())}
                 if(Array.isArray(data[key]) && data[key].length == 0){ delete data[key] }
               
                })
            const result = await this.#service.editProduct(id,data)
            return res.status(StatusCodes.OK).json({
                data : {
                    result,
                    message : productMessage.successEditProduct
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const search = req?.query?.search || ''

            const products = await this.#service.getAll(search)
            return res.status(StatusCodes.OK).json({
                data: {
                    products,
                    statusCode: StatusCodes.OK
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params
            const product = await this.#service.getProductById(id)
            return res.status(StatusCodes.OK).json({
                data: {
                    product,
                    statusCode: StatusCodes.OK
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getProductBySlug(req, res, next) {
        try {
            const { slug } = req.params
            const product = await this.#service.getProductBySlug(slug)
            res.status(StatusCodes.OK).json({
                data: {
                    product,
                    statusCode: StatusCodes.OK
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params
            const result = await this.#service.deleteProduct(id)
            res.status(StatusCodes.OK).json({
                data: {
                    result,
                    message: productMessage.deleteSuccessfully
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export const productController = new ProductController()