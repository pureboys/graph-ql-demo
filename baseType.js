// query{
//     getProInfo(id:1){
//         id,
//             proName,
//             type,
//             comment(comment_type:2)
//     }
// }

let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type proInfo {
    id: Int
    proName: String
    type: Int
    comment(comment_type:Int):[String]
  }

  type Query {
    getProInfo(id: Int): proInfo
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    getProInfo:({id}) => {
        const proName = "iphone"
        const type = 1
        const comment = ({comment_type}) => {
            if (comment_type === 1) {
                return ["我是京东的评论1","我是京东的评论2",];
            }
            return  ["我是百科的评论1","我是百科的评论2",];
        }
        return {
            id,
            proName,
            type,
            comment
        }
    }
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(express.static('public'));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');