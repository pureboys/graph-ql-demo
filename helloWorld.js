// query {
//     ver,
//         Method {
//         counts,
//             lists
//     }
// }

let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Method {
    counts: Int
    lists: [String]
  }
  type Query {
    ver: String
    Method: Method
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    ver: () => {
        return '0.1';
    },
    Method:() => {
        return {
            counts: 2,
            lists: ["getList", "getInfo"]
        }
    }
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');