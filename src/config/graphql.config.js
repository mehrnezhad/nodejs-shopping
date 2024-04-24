import { graphQLSchema } from "../graphql/index.graphql.js"
const graphqlConfig = (req, res) => {
    return {
        schema: graphQLSchema,
        graphiql: true,
        context: {
            req,
            res
        }
    }
}
export default graphqlConfig