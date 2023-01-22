import './WinnersPagination.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Content, Ids,
} from '../../constants/htmlConstants';

class WinnersPagination extends Element {
  constructor() {
    super('div', [ClassMap.winners.winnersPagination]);
    this.fill();
  }

  private fill(): void {
    const previousButton = new Element('button', [ClassMap.winners.winnersPrevious], Buttons.previous).element;
    const nextButton = new Element('button', [ClassMap.winners.winnersNext], Buttons.next).element;
    const paginationTitle = new Element('div', [ClassMap.winners.winnersPaginationTitle], Content.paginationTitle).element;
    this.element.append(previousButton, paginationTitle, nextButton);
    const page = new Element('span', [ClassMap.winners.winnersPaginationPage], '1', Ids.carsPage).element;
    paginationTitle.append(page);
  }
}

export default WinnersPagination;
