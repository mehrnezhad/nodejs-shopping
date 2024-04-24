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
 *                  -   meta_title
 *                  -   meta_description
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
 *                  meta_title:
 *                      type: string
 *                  meta_description: 
 *                      type: string
 *                  canonical:
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
 *                  meta_title:
 *                      type: string
 *                  meta_description: 
 *                      type: string
 *                  canonical:
 *                      type: string
 * 
 */

import { object } from "joi";

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
 *  /blog/category/{slug}:
 *      get:
 *          tags:
 *              -   Blog
 *          summary: get blogs with categorySlug
 *          parameters:
 *              -   in:  path
 *                  name: slug
 *                  type: string
 *              -   in: query
 *                  name: page
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success        
 */
/**
 * @swagger
 *  /blog/{slug}:
 *      get:
 *          tags:
 *              -   Blog
 *          summary: get blog with slug
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: slug
 *                  required: true
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
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddComment:
 *              type: object
 *              required:
 *                  -   comment
 *              properties:
 *                  comment:
 *                      type: string
 *                  parent:
 *                      type: string
 *          AddAnswer:
 *              type: object
 *              required: 
 *                  -   comment
 *              properties:
 *                  comment:
 *                      type: string
 *                 
 *
*/
/**
 * @swagger
 *  /blog/{id}/comment/create:
 *      patch:
 *          tags: 
 *              -   Blog
 *          summary: add comment to blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddComment'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddComment'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger 
 *  /blog/{id}/comment/{commentID}/createreply:
 *      patch:
 *          tags: 
 *              -   Blog
 *          summary: add answer to comment
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in : path
 *                  name: commentID
 *                  type: string
 *                  required: true
 *          requestBody: 
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddAnswer'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddAnswer'
 *          responses:
 *              200:
 *                  description: success
 */
