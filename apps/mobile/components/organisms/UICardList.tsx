import React from "react";
import { View, StyleSheet } from "react-native";
import { UICard } from "../molecules/UICard";
import { ImageSourcePropType } from "react-native";

type CardItem = {
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

type UICardListProps = {
  cards: CardItem[];
  selectedCards?: string[]; 
  onSelect?: (selected: string[]) => void;
};

export const UICardList: React.FC<UICardListProps> = ({
  cards,
  selectedCards = [],
  onSelect,
}) => {
  const toggleSelection = (title: string) => {
    let updatedSelection: string[];

    if (selectedCards.includes(title)) {
      updatedSelection = selectedCards.filter((t) => t !== title);
    } else {
      updatedSelection = [...selectedCards, title];
    }

    onSelect?.(updatedSelection);
  };

  const cardArray =
    cards.length >= 4 ? cards : [...cards, ...Array(4 - cards.length).fill({})];

  const renderCard = (card: CardItem, index: number) => {
    const isSelected = card.title && selectedCards.includes(card.title) ? true : undefined;

    return (
      <UICard
        key={index}
        title={card.title}
        description={card.description}
        image={card.image}
        onPress={() => {
          card.onPress?.();
          if (card.title) toggleSelection(card.title);
        }}
        isSelected={isSelected}
      />
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        {cardArray.slice(0, 2).map((card, index) => renderCard(card, index))}
      </View>
      <View style={styles.row}>
        {cardArray.slice(2, 4).map((card, index) => renderCard(card, index + 2))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
    gap: 10,
  },
});
