import { getCenterPosition } from './getCenterPosition';

export const getDistanceBetweenElements = (firstElement: HTMLElement, secondElement: HTMLElement): number => {
  const firstElementPosition = getCenterPosition(firstElement);
  const secondElementPosition = getCenterPosition(secondElement);

  return Math.sqrt(
    (firstElementPosition.x - secondElementPosition.x) ** 2 + (firstElementPosition.y - secondElementPosition.y) ** 2,
  ) + 70;
};
