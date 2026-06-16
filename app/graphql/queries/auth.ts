import { gql } from "@apollo/client";

export const IS_USER_EXIST = gql`
  query IsUserExist($email: String!) {
    isUserExist(email: $email)
  }
`;

export interface IsUserExistQueryResult {
  isUserExist: boolean;
}

export interface IsUserExistQueryVariables {
  email: string;
}
