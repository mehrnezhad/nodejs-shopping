/**
 * @swagger
 *  tags:
 *      name: Category
 *      description: Category module routes and EndPoint
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          createCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent: 
 *                      type: string
 *                  
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          updateCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 *                  
 */
/**
 * @swagger
 *  /category/create:
 *      post:
 *          tags:
 *              -   Category
 *          summary: create Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/createCategory'
 *                  application/json:
 *                      schema:
 *                          $ref : '#/components/schemas/createCategory'
 *          responses:
 *              201:
 *                  description: user Create Successfully
 *              500:
 *                  desciption: Internal Server Error
 *
 * 
 */
/**
 * @swagger
 *  /category/{id}/update:
 *        patch:
 *          tags:
 *              - Category
 *          summary: update category
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              content:
 *                application/x-www-form-urlencoded:
 *                    schema:
 *                      $ref: '#/components/schemas/updateCategory'
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/updateCategory'
 *          responses:
 *              200: 
 *                  descirption: Update Successfully
 *              500:
 *                  description: Internal Server Error 
 */
/**
 * @swagger
 *  /category/all:
 *      get:
 *          tags:
 *              -   Category
 *          summary: All Category List
 *          responses:
 *              200:
 *                  description: All Categories
 * 
 */
/**
 * @swagger
 *  /category/children/{id}:
 *      get:
 *          tags:
 *              -   Category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 *  /category/delete/{id}:
 *      delete:
 *          tags:
 *              -   Category
 *          parameters:
 *              -   in: path
 *                  name: id    
 *                  type: string
 *                  required: true
 *          responses:
 *              200:    
 *                  desciprion: Success
 */

/**
 * @swagger
 *  /category/{slug}:
 *      get:
 *          tags:
 *              -   Category
 *          parameters:
 *              -   in: path
 *                  name: slug
 *                  type: string
 *                  required: true
 *                  
 *          summary: get Category With Specific Slug
 *          responses:
 *              200:
 *                  description: get Category With Slug
 */

