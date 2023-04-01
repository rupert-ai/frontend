import { ResearchItem } from '../services/backend';

export const findChamp = (items: ResearchItem[]) => {
  return items.reduce((prev, curr) => (prev.score >= curr.score ? prev : curr));
};
