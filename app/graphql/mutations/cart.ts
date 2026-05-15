import { gql } from "@apollo/client";

export const CREATE_CART = gql`
  mutation CreateCart(
    $cartItems: [CartItemAttributes!]!
    $reorder: Boolean
    $externalUserId: String!
  ) {
    createCart(
      input: {
        cartItems: $cartItems
        reorder: $reorder
        externalUserId: $externalUserId
      }
    ) {
      cart {
        id
        cartItemsCount
      }
    }
  }
`;

export type CreateCartMutationResult = {
  createCart: { cart: { id: string; cartItemsCount: number } };
};
