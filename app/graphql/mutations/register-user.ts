import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $registerAttributes: RegisterAttributes!
    $publicPage: Boolean
  ) {
    registerUser(
      registerAttributes: $registerAttributes
      publicPage: $publicPage
    ) {
      message
      user {
        id
      }
      userId
      otpSent
      token
    }
  }
`;

export type RegisterUserInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
};

export type RegisterUserResponse = {
  registerUser: {
    message?: string | null;
    user?: {
      id: string;
    } | null;
    userId?: string | null;
    otpSent?: boolean | null;
    token?: string | null;
  };
};
