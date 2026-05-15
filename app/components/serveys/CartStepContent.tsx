import { SurveyType } from "@/app/graphql/queries/survey";
import { SurveyAnswers, SurveyQuestionnaire } from "./SurveyQuestionnaire";

interface CartStepContentProps {
  survey?: SurveyType;
  surveyAnswers: SurveyAnswers;
  onSingleSelect: (questionId: string, optionId: string) => void;
  onMultiSelect: (
    questionId: string,
    optionId: string,
    checked: boolean,
  ) => void;
  onTextChange: (questionId: string, value: string) => void;
  onComplete: () => void;
}

export const CartStepContent = ({
  survey,
  surveyAnswers,
  onSingleSelect,
  onMultiSelect,
  onTextChange,
  onComplete,
}: CartStepContentProps) => {
  console.log("survey", survey);

  return (
    <div className="space-y-6">
      {/* Survey / Questionnaire */}
      {survey && (
        <SurveyQuestionnaire
          survey={survey}
          answers={surveyAnswers}
          onSingleSelect={onSingleSelect}
          onMultiSelect={onMultiSelect}
          onTextChange={onTextChange}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
