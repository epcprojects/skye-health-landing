"use client";

import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./lib/apollo-client";

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
