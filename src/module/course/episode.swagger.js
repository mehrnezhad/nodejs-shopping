/**
 * @swagger
 *  components:
 *      schemas:
 *          addEpisode:
 *              type: object
 *              required:   
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   chapterID
 *                  -   courseID
 *              properties:
 *                  title:
 *                      type: string
 *                      example: title of episode
 *                  text:
 *                      type: string
 *                      example: text of  episode
 *                  video:
 *                      type: file
 *                      example: time of episode
 *                  chapterID:
 *                      type: string
 *                      example: "65f197eda45c6de6c09b396b"
 *                  courseID:
 *                      type: string
 *                      example: "65ee9fffeaff8a0b22fc5677"
 *                  type:
 *                      type: string
 *                      enum: 
 *                          -   unlock
 *                          -   lock
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          editEpisode:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: title Episode
 *                  text:
 *                      type: string
 *                      example: text Episode
 *                  video:
 *                      type: file
 *                      example: video Episode
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                      
 */
/**
 * @swagger
 *  /course/episode/addEpisode:
 *      post:
 *          summary: addEpisode
 *          tags:
 *              -   Episode
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/addEpisode'
 *          responses:
 *              200:
 *                  description: success
 *                  
 */
/**
 * @swagger
 *  /course/episode/removeEpisode/{episodeID}:
 *      delete:
 *          tags:
 *              -   Episode
 *          summary: get episode summary
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: episodeID
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 */
/**
 * @swagger
 *  /course/episode/editEpisode/{id}:
 *      patch:
 *          summary: edit episode
 *          tags:
 *              -   Episode
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/editEpisode"
 *          responses:
 *              200:
 *                  description: success
 *      
 */