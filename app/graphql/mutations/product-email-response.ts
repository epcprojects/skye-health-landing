import { gql } from "@apollo/client";

export const CREATE_PRODUCT_EMAIL_RESPONSES = gql`
  mutation CreateProductEmailResponses(
    $input: CreateProductEmailResponsesInput!
  ) {
    createProductEmailResponses(input: $input) {
      publicEmailResponse {
        id
        email
        externalUserId
      }
    }
  }
`;

export type CreateProductEmailResponsesMutationResult = {
  createProductEmailResponses: {
    publicEmailResponse: {
      id: string;
      email: string;
      externalUserId: string;
    } | null;
  } | null;
};

export type CreateProductEmailResponsesMutationVariables = {
  input: {
    dateOfBirth?: string;
    email: string;
    productIds: string[];
    gender?: string;
  };
};
