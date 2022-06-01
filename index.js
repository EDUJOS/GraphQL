import { gql, ApolloServer } from 'apollo-server'

const persons = [
    {
        "name": "John",
        "age": 30,
        "id": "3dfgs-655asdaa-asd7"
    },
    {
        "name": "Peter",
        "age": 20,
        "id": "3dfgs-655asd99-008-asd7"
    },
    {
        "name": "Mary",
        "age": 25,
        "id": "3dfgs-655asd99-008-asd7-9975a0"
    },
    {
        "name": "Sara",
        "age": 35,
        "id": "9abas-f5s4d99-008-asd7-9975a0-9975a0"
    }
]

const typeDefinitions = gql`
    type Person {
        name: String!
        age: Int
        id: ID!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        } 
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers: resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})