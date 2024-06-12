import axios from "axios"
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"

const wikiType = new GraphQLObjectType({
  name: "Wiki",
  fields: () => ({
    ns: { type: GraphQLInt },
    pageid: { type: GraphQLInt },
    size: { type: GraphQLInt },
    snippet: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    title: { type: GraphQLString },
    wordcount: { type: GraphQLInt },
  }),
})

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    wiki: {
      type: new GraphQLList(wikiType),
      args: {
        srsearch: { type: GraphQLString },
      },
      resolve(_, args) {
        return axios("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: args.srsearch,
          },
        }).then(
          ({ data: { query: { search: searchResults = [] } = {} } = {} }) =>
            searchResults
        )
      },
    },
  },
})

export default new GraphQLSchema({
  query: queryType,
})
