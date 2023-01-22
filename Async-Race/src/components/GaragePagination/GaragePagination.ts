import './GaragePagination.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Content, Ids,
} from '../../constants/htmlConstants';

class GaragePagination extends Element {
  constructor() {
    super('div', [ClassMap.garage.garagePagination]);
    this.fill();
  }

  private fill(): void {
    const previousButton = new Element('button', [ClassMap.garage.garagePrevious], Buttons.previous).element;
    const nextButton = new Element('button', [ClassMap.garage.garageNext], Buttons.next).element;
    const paginationTitle = new Element('div', [ClassMap.garage.garagePaginationTitle], Content.paginationTitle).element;
    this.element.append(previousButton, paginationTitle, nextButton);
    const page = new Element('span', [ClassMap.garage.garagePaginationPage], '1', Ids.carsPage).element;
    paginationTitle.append(page);
  }
}

export default GaragePagination;
