// query{
//     accounts {
//     name
//     age
//     sex
//     }
// }

// mutation{
//     createAccount(input:{
//         name: "oliver",
//             age:110,
//             sex: "man"
//     }){
//         name,
//             age,
//             sex
//     }
// }

// mutation{
//     updateAccount(id:"oliver", input:{
//         age: 11
//     }){
//         name,
//             age,
//             sex
//     }
// }

let express = require('express');
let {graphqlHTTP} = require('express-graphql');
let {buildSchema} = require('graphql');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
    }

    input AccountInput {
        name: String
        age: Int
        sex: String
    }

    type Mutation {
        createAccount(input: AccountInput):Account
        updateAccount(id:ID!, input:AccountInput):Account
    }
    
    type Query {
        accounts: [Account]
    }
    
`);


const fakeDb = {}

// The root provides a resolver function for each API endpoint
let root = {
    accounts(){
      let arr = []
        for (const key in fakeDb) {
            arr.push(fakeDb[key])
        }
        return arr;
    },
    createAccount({input}) {
        fakeDb[input.name] = input;
        return fakeDb[input.name]
    },
    updateAccount({id, input}) {
        const updateAccount = Object.assign({}, fakeDb[id], input);
        fakeDb[id] = updateAccount
        return updateAccount
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


