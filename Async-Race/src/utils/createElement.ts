import { IOptionsElement } from '../types/interfaces';

export const createElement = ({
  tag = 'div',
  classList,
  content,
  id,
}: IOptionsElement): HTMLElement => {
  const element = document.createElement(tag);

  if (classList && classList.length > 0) {
    element.classList.add(...classList);
  }

  if (content) {
    element.textContent = content;
  }

  if (id) {
    element.id = id;
  }

  return element;
};
