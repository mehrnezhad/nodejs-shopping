/**
 * @swagger
 *  tags:
 *      name: Permission
 *      description: Permission Route & Module
 */
/**
 * @swagger
 *  definitions:
 *      PermissionDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                   type: integer
 *                   example : 201
 *              data:
 *                   type: array
 *                   items:   
 *                      type: object 
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: title of permission
 *                          description:
 *                              type: string
 *                              example: description of permission
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddPermission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *          UpdatePermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 */
/**
 * @swagger
 *  /permission/add:
 *      post:
 *          tags: 
 *              -   Permission
 *          summary: Add Permission
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddPermission'
 *                  application/json:
 *                      schema:                
 *                          $ref: '#/components/schemas/AddPermission'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /permission/list:
 *      get:
 *          tags:
 *              -   Permission
 *          summary: get list of permissions
 *          parameters:
 *              -   in: query
 *                  type: string
 *                  name: search
 *          responses:
 *              200:
 *                  description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/PermissionDefinition'
 *                  
 *          
 */
/**
 * @swagger
 *  /permission/remove/{id}:
 *      delete:
 *          summary: delete permission by id
 *          tags:
 *              -   Permission
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
 *  /permission/update/{id}:
 *      patch:
 *          summary: update permission by id
 *          tags:
 *              -   Permission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdatePermission'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdatePermission'
 *          responses:
 *              200:
 *                  description: success
 *      
 */