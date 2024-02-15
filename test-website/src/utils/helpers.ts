import { PaintImageJobInputNewOptions, PaintImageJobInputOptions, ResearchItem } from '../services/backend';

export const findChamp = (items: ResearchItem[]) => {
  return items.reduce((prev, curr) => (prev.score >= curr.score ? prev : curr));
};

export const isOldApi = (
  options: PaintImageJobInputOptions | PaintImageJobInputNewOptions,
): options is PaintImageJobInputOptions => {
  return (options as PaintImageJobInputOptions).image_path != undefined;
};
