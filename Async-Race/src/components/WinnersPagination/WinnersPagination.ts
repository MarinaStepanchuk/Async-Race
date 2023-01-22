import './WinnersPagination.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Content, Ids,
} from '../../constants/htmlConstants';

class WinnersPagination extends Element {
  constructor() {
    super('div', [ClassMap.winnersPagination]);
    this.fill();
  }

  private fill(): void {
    const previousButton = new Element('button', [ClassMap.winnersPrevious], Buttons.previous).element;
    const nextButton = new Element('button', [ClassMap.winnersNext], Buttons.next).element;
    const paginationTitle = new Element('div', [ClassMap.winnersPaginationTitle], Content.paginationTitle).element;
    this.element.append(previousButton, paginationTitle, nextButton);
    const page = new Element('span', [ClassMap.winnersPaginationPage], '1', Ids.carsPage).element;
    paginationTitle.append(page);
  }
}

export default WinnersPagination;
