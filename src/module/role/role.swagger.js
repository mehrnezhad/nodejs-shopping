/**
 * @swagger
 *  tags:
 *      name: Role
 *      description: API for managing roles.
 */
/**
 * @swagger
 *  definitions:
 *      RoleDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                   type: integer
 *                   example : 200
 *              data:
 *                   type: array
 *                   items:   
 *                      type: object 
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: title of role
 *                          permissions:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: ["blog","course","product"]        
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          addRole:
 *              type: object
 *              required:
 *                  -   title 
 *                  -   permissions
 *              properties: 
 *                  title:
 *                      type: string
 *                  permissions:
 *                      type: array
 *                      items:
 *                          type: string
 *          updateRole:
 *              type: object
 *              properties: 
 *                  title:
 *                      type: string
 *                  permissions:
 *                      type: array
 *                      items:
 *                          type: string
 */
/**
 * @swagger
 *  /role/createRole:
 *      post:
 *          summary: add role
 *          tags:
 *              -   Role
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addRole'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addRole'
 *          responses:
 *              200:
 *                  description: success        
 *              
 */
/**
 * @swagger
 *  /role/list:
 *      get:
 *          summary: get list of all available roles
 *          tags:
 *              -   Role
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/RoleDefinition'
 */
/**
 * @swagger
 *  /role/remove/{field}:
 *      delete:
 *          summary: delete role
 *          tags:
 *              -   Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad request
 */
/**
* @swagger
*  /role/update/{id}:
*      patch:
*          summary: update role
*          tags:
*              -   Role
*          parameters:
*              -   in: path
*                  name: id
*                  required: true
*                  type: string
*          requestBody:
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/updateRole'
*                  application/x-www-form-urlencoded:
*                      schema:
*                          $ref: '#/components/schemas/updateRole'
*          responses:
*              200:
*                  description: success
*              400:
*                  description: bad request
*/