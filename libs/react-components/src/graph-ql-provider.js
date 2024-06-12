import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import React from "react"

import { AuthService } from "@platforms/services"

import { useAuth } from "./auth-provider"

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL

console.log(GRAPHQL_URL)

const promiseToObservable = (promise) =>
  new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) {
          return
        }

        subscriber.next(value)
        subscriber.complete()
      },
      (err) => subscriber.error(err)
    )
    return subscriber
  })

function StateProvider(props) {
  const { resign } = useAuth()

  const httpLink = new HttpLink({
    uri: `${GRAPHQL_URL}/graphql`,
  })

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...AuthService.getAuthHeader(),
      },
    }))

    return forward(operation)
  })

  const errorLink = onError(({ networkError, forward, operation }) => {
    if (networkError.statusCode === 401) {
      return promiseToObservable(resign()).flatMap(() => forward(operation))
    }
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client} {...props} />
}

export const GraphQLProvider = StateProvider
