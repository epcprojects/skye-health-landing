import { gql } from "@apollo/client";

export const CREATE_OR_UPDATE_SURVEY_RESPONSE = gql`
  mutation CreateOrUpdateSurveyResponse(
    $answers: [SurveyAnswerInput!]!
    $productIds: [ID!]!
    $cartId: ID!
    $status: String!
    $externalUserId: String!
  ) {
    createOrUpdateSurveyResponse(
      input: {
        answers: $answers
        productIds: $productIds
        cartId: $cartId
        status: $status
        externalUserId: $externalUserId
      }
    ) {
      surveyResponses {
        id
        surveyId
        cartId
        orderId
        status
        completedAt
      }
    }
  }
`;
