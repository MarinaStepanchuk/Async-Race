import './GaragePagination.styles.scss';
import Element from '../Element';
import { Buttons, ClassMap, Content, Id } from '../../constants/htmlConstants';

class GaragePagination extends Element {
  constructor() {
    super('div', [ClassMap.garagePagination]);
    this.fill();
  }

  private fill(): void {
    const previousButton = new Element('button', [ClassMap.garagePrevious], Buttons.previous).element;
    const nextButton = new Element('button', [ClassMap.garageNext], Buttons.next).element;
    const paginationTitle = new Element('div', [ClassMap.garagePaginationTitle], Content.paginationTitle).element;
    this.element.append(previousButton, paginationTitle, nextButton);
    const page = new Element('span', [ClassMap.garagePaginationPage], '1', Id.carsPage).element;
    paginationTitle.append(page);
  }
}

export default GaragePagination;
