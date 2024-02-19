/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth modules and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          sentOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          checkOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          refreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 */
/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: Login with OTP in this endpoint
 *      tags: 
 *          -   Auth
 *      requestBody: 
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/sentOTP'
 * 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/sentOTP'
 *      responses:
 *          200:
 *              description: success
 * 
 */

/**
 * @swagger
 *  /auth/check-otp:
 *      post:
 *          summary: check user's code
 *          tags:
 *              -   Auth
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /auth/refresh-token:
 *      post:
 *          summary: send refresh token and create new access token
 *          tags:
 *              -   Auth
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description : unauthorized
 *                                        
 *                      
 */


/**
 * @swagger
 *  /auth/check:
 *      get:
 *          summary: check
 *          tags:
 *              -   Auth
 *          parameters:
 *              -   in: header
 *                  name: accesstoken
 *          responses:
 *              200:
 *                  description: success
 */