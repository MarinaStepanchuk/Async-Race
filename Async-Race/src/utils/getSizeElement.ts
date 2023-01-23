import { SizeElement } from '../types/types';

export const getSizeElement = (element: HTMLElement): SizeElement => {
  const data = element.getBoundingClientRect();
  return {
    width: data.width,
    height: data.height,
  };
};
