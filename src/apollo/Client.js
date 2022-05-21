import {useMemo} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import {createAuthLink} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import config from '../aws-exports';
import {useAuthContext} from '../contexts/AuthContext';

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const httpLink = createHttpLink({
  uri: url,
});

const mergeList = (existing = {}, incoming) => {
  return {
    ...existing,
    ...incoming,
    items: [...(existing?.items || []), ...incoming.items],
  };
};

const typePolicies = {
  Query: {
    fields: {
      commentsByPost: {
        keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeList,
      },
      postsByDate: {
        keyArgs: ['type', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeList,
      },
    },
  },
};

const Client = ({children}) => {
  const {user} = useAuthContext();

  const client = useMemo(() => {
    let jwtToken = '';

    if (user) {
      jwtToken = user?.getSignInUserSession()?.getAccessToken()?.getJwtToken();
    }

    const auth = {
      type: config.aws_appsync_authenticationType,
      jwtToken,
    };
    const link = ApolloLink.from([
      createAuthLink({url, region, auth}),
      createSubscriptionHandshakeLink({url, region, auth}, httpLink),
    ]);

    return new ApolloClient({
      link,
      cache: new InMemoryCache({typePolicies}),
    });
  }, [user]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
