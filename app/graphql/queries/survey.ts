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
    maxSelections
    showOptionIds
    gender
    questionOptions {
      id
      optionText
      position
      qualiphyRecordId
      value
      stoppingCriteria
    }
    answer {
      questionOptionIds
      valueText
    }
  }
`;

export const FETCH_SURVEY_FOR_PRODUCTS = gql`
  query FetchSurveyForProducts(
    $productIds: [ID!]!
    $cartId: ID
    $externalUserId: String
  ) {
    fetchSurveyForProducts(
      productIds: $productIds
      cartId: $cartId
      externalUserId: $externalUserId
    ) {
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
  stoppingCriteria?: string | null;
}

export interface AnswerType {
  questionOptionIds: string[];
  valueText: string;
  hardStop?: boolean | null;
}

export interface ShowOptionType {
  id: string;
  optionText: string;
  question?: {
    id: string;
  } | null;
}

export interface QuestionType {
  body: string;
  category: string | null;
  id: string;
  maxSelections?: number | null;
  position: number;
  qualiphyRecordId: string;
  questionType: string;
  showOptionIds?: string[];
  showOptions?: ShowOptionType[];
  gender?: string | null;
  labsScope?: string | null;
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

export interface FetchSurveyVariables {
  productIds: string[];
  cartId?: string | null;
  externalUserId?: string | null;
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
