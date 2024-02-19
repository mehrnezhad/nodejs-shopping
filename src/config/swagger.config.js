import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"

const swaggerCongif = (app) => {
  const swaggerDefinition = swaggerUI.setup(swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.1.0",
      info: {
        title: 'Shopping with nodejs expressjs',
        description: 'online shop with node,express,graphql,mongodb,socket.io',
        version: '0.0.1',
        contact: {
          name: 'ali zafari',
          email: 'ali.zafarimehrnezhad@gmail.com',
          url: 'www.lunagasht.com'
        }
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [{ BearerAuth: [] }]
    },
    apis: ["./src/module/**/*.swagger.js"]
  })
  
  )


  app.use('/api-docs', swaggerUI.serve, swaggerDefinition)
}

export default swaggerCongif