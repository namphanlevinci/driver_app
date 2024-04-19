import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import Config from 'react-native-config';
import _ from 'lodash';
import { getJwtToken } from '../services/AsyncStoreExt';
import * as NavigationService from '../navigation/NavigationService';

const httpLink = createHttpLink({
  // uri: 'https://jollibee.test88.info/graphql',
  uri: "https://api.jollibee.com.vn/graphql",
});
const authLink = setContext(async (req, { headers }) => {
  // get auth token
  const jwt = await getJwtToken();
  let myHeaders = headers;
  if (!headers) {
    myHeaders = {
      'Content-Type': 'application/json',
      credentials: 'same-origin',
      Accept: 'application/json',
    };
  }
  return {
    headers: {
      ...myHeaders,
      authorization: jwt ? `Bearer ${jwt}` : '',
      // Authorization: 'Basic bGV2aW5jaToxcWF6QFdTWA==',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) => {
    // console.log(graphQLErrors, '*************graphQLErrors*************');

    if (graphQLErrors?.length > 0) {
      // Logger.debug(graphQLErrors, '*************graphQLErrors*************');

      let queryErrors = [];
      let arrErrors = {};
      graphQLErrors.map(
        (
          {
            debugMessage,
            message,
            locations,
            path,
            extensions: { category, code },
          },
          index,
        ) => {
          queryErrors.push(debugMessage ?? message);
          // console.log(category);
          if (category === 'graphql-authorization') {
            NavigationService.logout();
          }
        },
      );

      if (queryErrors.length > 0) {
        response.error = { message: queryErrors };
      }
      if (!_.isEmpty(arrErrors)) {
        response.error = arrErrors;
      }
    }

    if (networkError) {
      // Logger.debug('[Network error]:', networkError);
      const { name, statusCode, result = {} } = networkError;
      switch (statusCode) {
        case 503:
          alert('Hệ thống bảo trì');
          break;
        case 500:
          // alert('Vui lòng kết nối Internet');
          break;
        default:
          break;
      }
    }
  },
);

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
};

const graphQlClient = new ApolloClient({ link, cache, defaultOptions });

export default graphQlClient;
