/**
 * @swagger 
 *  tags:
 *      name: "Product"
 *      description: "products routes and modules"
 */



/**
 * @swagger
 *   components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   images
 *                  -   tags
 *                  -   category
 *                  -   type
 *                  -   meta_title
 *                  -   meta_description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  slug:
 *                      type: string
 *                      description: slug of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text: 
 *                      type: string
 *                      description: text of product    
 *                  images:
 *                      type: array
 *                      description: images product
 *                      items:
 *                          type: string
 *                          format: binary
 *                  tags:
 *                      type: array
 *                      description: tags products
 *                      items:
 *                          type: string
 *                  category: 
 *                      type: string
 *                      description: categpry product
 *                  type:
 *                      type: string
 *                      description: type of product
 *                  price:
 *                      type: number
 *                      description: price product
 *                  meta_title:
 *                      type: string
 *                      description: meta_title product
 *                  meta_description:
 *                      type: string
 *                      description: meta_description product
 *                  width:
 *                      type: string
 *                      description: width of product
 *                  height:
 *                      type: string
 *                      description: height of string
 *                  length:
 *                      type: string
 *                      description: length of string
 *                  weight:
 *                      type: string
 *                      description: weight of string
 *                  color:
 *                      type: string
 *                      enum:
 *                          -   قرمز
 *                          -   آبی
 *                          -   مشکی
 *                          -   سفید
 *                  
 *             
 */


/**
 * @swagger
 *   components:
 *      schemas:
 *          editProduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  slug:
 *                      type: string
 *                      description: slug of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text: 
 *                      type: string
 *                      description: text of product    
 *                  images:
 *                      type: array
 *                      description: images product
 *                      items:
 *                          type: string
 *                          format: binary
 *                  tags:
 *                      type: array
 *                      description: tags products
 *                      items:
 *                          type: string
 *                  category: 
 *                      type: string
 *                      description: categpry product
 *                  type:
 *                      type: string
 *                      description: type of product
 *                  price:
 *                      type: number
 *                      description: price product
 *                  meta_title:
 *                      type: string
 *                      description: meta_title product
 *                  meta_description:
 *                      type: string
 *                      description: meta_description product
 *                  width:
 *                      type: string
 *                      description: width of product
 *                  height:
 *                      type: string
 *                      description: height of string
 *                  length:
 *                      type: string
 *                      description: length of string
 *                  weight:
 *                      type: string
 *                      description: weight of string
 *                  color:
 *                      type: string
 *                      enum:
 *                          -   قرمز
 *                          -   آبی
 *                          -   مشکی
 *                          -   سفید           
 */


/**
 * @swagger
 *  /product/edit/{id}:
 *      patch:
 *          tags:
 *              - Product
 *          summary: edit Product
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true  
 *                  description: id product
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/editProduct'
 *          responses:
 *              200:
 *                  description: success     
 */



/**
 * @swagger
 *  /product/add:
 *      post:
 *          summary: create product
 *          tags:
 *              -   Product
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: Success
 * 
 */

/**
 * @swagger
 *  /product/getAll:
 *      get:
 *          summary: get all products
 *          tags:
 *              -   Product
 *          parameters:
 *              -   in: query
 *                  type: string
 *                  name: search
 *                  description: search  by title, category or id
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /product/deleteProductById/{id}:
 *      delete:
 *          summary: delete product by id
 *          tags:
 *              -   Product
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                    
 */
/**
 * @swagger
 *  /product/getProductById/{id}:
 *      get:
 *          summary: get product with id
 *          tags:
 *              -   Product
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  type: string
 *                  name: id
 *          responses:
 *              200:
 *                  description: success 
 */
/**
 * @swagger
 *  /product/getProductBySlug/{slug}:
 *      get:
 *          summary: get product with slug
 *          tags:
 *              -   Product
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name : slug
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                      
 */