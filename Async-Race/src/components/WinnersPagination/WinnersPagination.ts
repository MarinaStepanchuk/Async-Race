import './WinnersPagination.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Content, Ids,
} from '../../constants/htmlConstants';
import { Direction } from '../../types/enums';
import { State } from '../../constants/state';
import Api from '../../api/Api';
// eslint-disable-next-line import/no-cycle
import WinnerPage from '../../pages/winners/WinnerPage';

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
    const page = new Element('span', [ClassMap.winners.winnersPaginationPage], `${State.PARAMS_WINNERS.page}`, Ids.carsPage).element;
    paginationTitle.append(page);

    this.disableButtons(previousButton, nextButton);

    nextButton.addEventListener('click', () => {
      this.changePage(Direction.NEXT);
      this.disableButtons(previousButton, nextButton);
    });

    previousButton.addEventListener('click', () => {
      this.changePage(Direction.PREVIOUS);
      this.disableButtons(previousButton, nextButton);
    });
  }

  private changePage(direction: string): void {
    if (direction === Direction.NEXT) {
      State.PARAMS_WINNERS.page += 1;
    } else {
      State.PARAMS_WINNERS.page -= 1;
    }
    const winnersUpdate = new WinnerPage();
    winnersUpdate.render();
  }

  private async disableButtons(previousButton: HTMLElement, nextButton: HTMLElement): Promise<void> {
    const data = await new Api().getWinners();
    const totalCars = data ? Number(data.countWinners) : 0;
    const maxPage = Math.ceil(totalCars / State.PARAMS_WINNERS.limit);

    if (maxPage === 1 && State.PARAMS_WINNERS.page === 1) {
      previousButton.setAttribute('disabled', 'true');
      nextButton.setAttribute('disabled', 'true');
    } else if (State.PARAMS_WINNERS.page === 1) {
      previousButton.setAttribute('disabled', 'true');
      nextButton.removeAttribute('disabled');
    } else if (State.PARAMS_WINNERS.page === maxPage) {
      previousButton.removeAttribute('disabled');
      nextButton.setAttribute('disabled', 'true');
    } else {
      previousButton.removeAttribute('disabled');
      nextButton.removeAttribute('disabled');
    }
  }
}

export default WinnersPagination;
