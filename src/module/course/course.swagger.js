/**
 * @swagger 
 *  tags:
 *      name: Course
 *      description: Course Routes & Modules
 */
/**
 * @swagger 
 *  tags:
 *      name: Episode
 *      description: Episode Route and Description
 */
/**
 * @swagger
 *  definitions:
 *      listCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: title course
 *                          slug:
 *                              type: string
 *                              example: slug of course
 *                          short_text:
 *                              type: string
 *                              example: Short text about the course.
 *                          image:
 *                              type: string
 *                              example: image of course
 *                          tags:
 *                              type: array
 *                              example: tags of course
 *                          category:
 *                              type: string
 *                              example: category of course
 *                          type:
 *                              type: string
 *                              example: type of course 
 *                          price:
 *                              type: integer
 *                              example: 250,000
 *                          discount:
 *                              type: integer
 *                              example: 4%
 *                          studentsCount:
 *                              type: integer
 *                              example: 340
 *                          teacher:
 *                              type: string
 *                              example: 'ali zafari'
 *                          
 *                  
 *                      
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   image
 *                  -   tags
 *                  -   category
 *                  -   type
 *                  -   meta_title
 *                  -   meta_description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of course
 *                  slug:
 *                      type: string
 *                      description: slug of course
 *                  short_text:
 *                      type: string
 *                      description: short_text of course
 *                  text: 
 *                      type: string
 *                      description: text of course    
 *                  image:
 *                      type: file
 *                  tags:
 *                      type: array
 *                      description: tags course
 *                      items:
 *                          type: string
 *                  category: 
 *                      type: string
 *                      description: categpry course
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   free
 *                          -   special
 *                          -   cash
 *                      description: type of course
 *                  meta_title:
 *                      type: string
 *                      description: meta_title course
 *                  meta_description:
 *                      type: string
 *                      description: meta_description course
 *          updateCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of course
 *                  slug:
 *                      type: string
 *                      description: slug of course
 *                  short_text:
 *                      type: string
 *                      description: short_text of course
 *                  text: 
 *                      type: string
 *                      description: text of course    
 *                  image:
 *                      type: file
 *                  tags:
 *                      type: array
 *                      description: tags course
 *                      items:
 *                          type: string
 *                  category: 
 *                      type: string
 *                      description: categpry course
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   free
 *                          -   special
 *                          -   cash
 *                      description: type of course
 *                  meta_title:
 *                      type: string
 *                      description: meta_title course
 *                  meta_description:
 *                      type: string
 *                      description: meta_description course
 * 
 */
/**
 * @swagger
 *  /course/addCourse:
 *      post:
 *          tags:
 *              -   Course
 *          summary: add new course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCourse'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/listCourses'
 *                  
 * 
 */
/**
 * @swagger
 *  /course/update/{id}:
 *      patch:
 *          summary: update Course
 *          tags:
 *              -   Course
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/updateCourse"
 *          responses:
 *              200:
 *                  description: success
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
 *  /course/allList:
 *      get:
 *          tags:
 *              -   Course
 *          summary: get all list Course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search item
 *          responses:
 *              200:    
 *                  description: success 
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 *              
 */
/**
 * @swagger
 *  /course/getCourseById/{id}:
 *      get:
 *          tags:
 *              -   Course
 *          summary: get Course By ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      example: title of chapter
 *                  text:
 *                      type: string
 *                      example: description chapter
 *          updateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: title of chapter
 *                  text:
 *                      type: string
 *                      example: description od chapter
 *     
 */


/**
 * @swagger
 *  /course/{id}/addChapter:
 *      patch:
 *          summary: add chapter to course
 *          tags:
 *              -   Course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *                  application/x-www-form-urlencoded:      
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinitions'
 * 
 */

/**
 * @swagger
 *  definitions:  
 *      listChapters:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          example: title chapter
 *                      _id:
 *                          type: string
 *                          example: "65ee9fffeaff8a0b22fc5677"
 *                      chapter:
 *                          type: array
 *                          items:
 *                              type: object
 *                          example: [{}]
 *                         
*/
/**
 * @swagger
 *  /course/{id}/getChapters:
 *      get:
 *          summary: get chapters of course
 *          tags:
 *              -   Course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/listChapters'
 */    

/**
 * @swagger 
 *  /course/getOneChapter/{id}:
 *      get:
 *          summary: get one chapter
 *          tags:
 *              -   Course
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name:   id
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * 
 * @swagger
 *  /course/deleteChapter/{id}:
 *      delete:
 *          summary: delete chapter by id
 *          tags:
 *              -   Course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 */
/**
 * @swagger
 *  /course/updateChapter/{id}:
 *      patch:
 *          tags: 
 *              -   Course
 *          summary: add  or update a chapter
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateChapter'
 *          responses:
 *              200:
 *                  description: success
 *              
 */