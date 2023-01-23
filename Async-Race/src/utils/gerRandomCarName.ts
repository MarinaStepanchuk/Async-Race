import { CarBrands, CarModels } from '../constants/constants';

export const getRandomCarName = (): string => {
  const brand = CarBrands[(Math.floor(Math.random() * CarBrands.length))];
  const model = CarModels[(Math.floor(Math.random() * CarModels.length))];
  return `${brand} ${model}`;
};
