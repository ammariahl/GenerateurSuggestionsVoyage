export interface DestinationCard {
  id: number;
  image: string;
  name: string;
  seasons: {
    id: number;
    winter: string;
    spring: string;
    summer: string;
    autumn: string;
  }[];
  budgets: {
    littleBudget: boolean;
    mediumBudget: boolean;
    bigBudget: boolean;
    unlimited: boolean;
  }[];
  activities: string;
  documents: string[];
  descriptionLong: string;
  descriptionShort: string;
}
