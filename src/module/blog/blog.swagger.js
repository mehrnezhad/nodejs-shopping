/**
 * @swagger
 *  tags:
 *      name: Blog
 *      description: Blog routes and modules
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          createBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *                  -   short_desc
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  description:
 *                      type: string
 *                  short_desc:    
 *                      type: string  
 *                  image:
 *                      type: file 
 *                  category:
 *                      type: string
 *          updateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  description:
 *                      type: string
 *                  short_desc:
 *                      type: string
 *                  image:
 *                      type: file
 *                  category:
 *                      type: string
 * 
 */

/**
 * @swagger
 *  /blog/create:
 *      post:
 *          tags:
 *              -   Blog
 *          summary: create blog
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/createBlog'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/createBlog' 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/createBlog' 
 *  
 *          responses:
 *              200:
 *                  description: create Success
 */
/**
 * @swagger
 *  /blog/update/{id}:
 *      patch:
 *          tags:
 *              -   Blog
 *          summary: update blog with id
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateBlog'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateBlog'
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/updateBlog'   
 *          responses:
 *              200:
 *                  description: success  
 * 
 */
/**
 * @swagger
 *  /blog/all:
 *      get:
 *          tags:
 *              -   Blog
 *          summary: get all blog     
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /blog/{id}:
 *      get:
 *          tags:
 *              -   Blog
 *          summary: get blog with id
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
 *  /blog/{id}:
 *      delete:
 *          tags:
 *              -   Blog
 *          summary: delete blog with Id
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
