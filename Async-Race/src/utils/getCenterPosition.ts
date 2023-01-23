import { Coordinates } from '../types/types';

export const getCenterPosition = (element: HTMLElement): Coordinates => {
  const data = element.getBoundingClientRect();
  return {
    x: data.left + data.width / 2,
    y: data.top + data.height / 2,
  };
};
