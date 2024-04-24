import { productMessage } from "./product.message.js";
import { productModel } from "./product.model.js";
import createHttpError from "http-errors";

class ProductService {
  #model
  constructor() {
    this.#model = productModel
  }
  async addProduct(productData) {

    await this.chechExistsBySlug(productData.slug)
    const result = await this.#model.create(productData)
    return result
  }

  async editProduct(id, productData) {
    await this.chechExistsById(id)
    const result = await this.#model.updateOne({ _id: id }, { $set: productData })
    if (result.modifiedCount == 0) { throw new createHttpError.BadRequest(productMessage.errorEditProduct) }
    return result;
  }
  async getAll(search) {
    let products
    if (products) {

      products = await this.#model.find({
        $text: {
          $search: search
        }
      })
    } else {

      products = await this.#model.find({})
    }
    return products
  }

  async getProductById(id) {

    const product = await this.#model.findById(id).populate([{ path: "category", select: { title: 1, "children": 0 } }]);
    if (!product) { throw new createHttpError.NotFound(productMessage.notFound) }
    return product

  }
  async getProductBySlug(slug) {
    const product = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $match: {
          slug
        }
      },
      {
        $project: {
          "category._id": 0,
          "__v": 0,
          "category.children": 0,
          "category.parent": 0,
          "category.parents": 0,
          "category.createdAt": 0,
          "category.updatedAt": 0
        }
      }
    ])
    if (!product) { throw new createHttpError.NotFound(productMessage.notFound) }
    return product

  }
  async chechExistsBySlug(slug) {
    const product = await this.#model.findOne({ slug })
    if (product) { throw new createHttpError.NotFound(productMessage.slugAllreadyExists) }
    return null
  }

  async chechExistsById(id) {
    const product = await this.#model.findById(id)
    if (!product) { throw new createHttpError.NotFound(productMessage.notFound) }
    return null
  }

  async deleteProduct(id) {
    await this.chechExistsById(id)
    const result = await this.#model.deleteOne({ _id: id })
    if (result.deletedCount == 0) throw new createHttpError.BadRequest(productMessage.deleteSuccessfully)
    return result
  }

}

export const productService = new ProductService()