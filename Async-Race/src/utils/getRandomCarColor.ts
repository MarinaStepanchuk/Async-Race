import { maximumColorIntensity } from '../constants/constants';

export const getRandomCarColor = (): string => {
  const r = Math.floor(Math.random() * maximumColorIntensity);
  const g = Math.floor(Math.random() * maximumColorIntensity);
  const b = Math.floor(Math.random() * maximumColorIntensity);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
