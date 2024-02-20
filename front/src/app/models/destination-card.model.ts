export interface DestinationCard {
  image: string;
  name: string;
  seasons: string;
  budgets: {
    littleBudget: boolean;
    mediumBudget: boolean;
    bigBudget: boolean;
    unlimited: boolean;
  }[];
  activities: string;
  documents: string[];
  descriptionLong: string;
}
