import { gql } from "@apollo/client";

export const surveyAttributes = `
  category
  gender
  id
  labsRequired
  name
  status
  totalQuestionsCount
  questions {
    body
    category
    id
    position
    qualiphyRecordId
    questionType
    deferOptionIds
    questionOptions {
      id
      optionText
      position
      qualiphyRecordId
      value
    }
    answer {
      questionOptionIds
      valueText
      questionOptionIds
    }
  }
`;

export const FETCH_SURVEY_FOR_PRODUCTS = gql`
  query FetchSurveyForProducts($productIds: [ID!]!, $cartId: ID) {
    fetchSurveyForProducts(productIds: $productIds, cartId: $cartId) {
      ${surveyAttributes}
  }
}
`;

export interface QuestionOptionType {
  id: string;
  optionText: string;
  position: number;
  qualiphyRecordId: string;
  value: string;
}

export interface AnswerType {
  questionOptionIds: string[];
  valueText: string;
}

export interface QuestionType {
  body: string;
  category: string | null;
  id: string;
  position: number;
  qualiphyRecordId: string;
  questionType: string;
  deferOptionIds?: string[];
  questionOptions: QuestionOptionType[];
  answer: AnswerType | null;
}

export interface SurveyType {
  category: string;
  gender: string | null;
  id: string;
  labsRequired: boolean;
  name: string;
  status: string | null;
  totalQuestionsCount: number;
  questions: QuestionType[];
}

export interface FetchSurveyType {
  fetchSurveyForProducts: SurveyType | SurveyType[];
}

export interface CartItemType {
  id: string;
  price: number;
  quantity: number;
  product: ProductType;
}

export interface ProductType {
  category: string;
  id: string;
  name: string;
  price: number;
  partNumber: string;
  strength: string;
}
