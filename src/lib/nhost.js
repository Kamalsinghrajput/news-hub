import { NhostClient } from "@nhost/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_APP_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_APP_NHOST_REGION,
});

const httpLink = new HttpLink({
  uri: "https://rjiichecoecnuwrqvmap.hasura.ap-south-1.nhost.run/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = nhost.auth.getAccessToken();
  const user = nhost.auth.getUser();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
    params: {
      userId: user,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}
