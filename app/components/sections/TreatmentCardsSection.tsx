"use client";

import TreatmentCard from "../cards/TreatmentCard";

export interface TreatmentOverviewCard {
  id: number;
  title: string;
  buttonLabel: string;
  backgroundImage: string;
  backgroundColor: string;
  hoverText: string;
  hoverBackgroundColor: string;
  onClick: () => void;
  onButtonClick: () => void;
}

interface TreatmentCardsSectionProps {
  cards: TreatmentOverviewCard[];
}

const TreatmentCardsSection = ({
  cards,
}: TreatmentCardsSectionProps) => {
  return (
    <section className="bg-[#F5F8FE] pt-6 pb-6 xl:pt-20 xl:pb-27">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 lg:grid-cols-2 xl:px-8">
        {cards.map((card) => (
          <TreatmentCard
            key={card.id}
            title={card.title}
            buttonLabel={card.buttonLabel}
            backgroundImage={card.backgroundImage}
            backgroundColor={card.backgroundColor}
            hoverText={card.hoverText}
            hoverBackgroundColor={card.hoverBackgroundColor}
            onClick={card.onClick}
            onButtonClick={card.onButtonClick}
          />
        ))}
      </div>
    </section>
  );
};

export default TreatmentCardsSection;