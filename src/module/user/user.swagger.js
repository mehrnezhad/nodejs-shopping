/**
 * @swagger
 *  tags:
 *      name: User
 *      description : Route and module Users
 * 
 */

/**
 * @swagger
 *  definitions:
 *      publicDefinitions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          exmaple : success
 */
/**
 * @swagger
 *  /user/getAllUsers:
 *      get:
 *          summary: get all users
 *          tags:
 *              -   User
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search field
 *          responses:
 *              200:
 *                  description: success
 *              content:
 *                  application/json:
 *                      $ref: "#/definitions/publicDefinitions"
 * 
 * 
 * 
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUser:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: update user's username
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  email:
 *                      type: string    
 *                                  
 */
/**
 * @swagger
 *  /user/updateUser:
 *      patch:
 *          summary: update user's profile
 *          tags:
 *              -    User
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateUser'
 * 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateUser'
 *          responses:
 *              200:
 *                  description: success
 *                  
 */


/**
 * @swagger
 *  /user/profile:
 *      get:
 *          summary: get users profile
 *          tags:
 *              -   User
 *          responses:
 *              200:
 *                  description: success
 *              content:
 *                  application/json:
 *                      $ref: "#/definitions/publicDefinitions"
 * 
 * 
 * 
 */