import './GaragePagination.styles.scss';
import Element from '../Element';
import {
  Buttons,
  ClassMap,
  Content,
  Ids,
} from '../../constants/htmlConstants';
import { State } from '../../constants/state';
import Api from '../../api/Api';
import { Direction } from '../../types/enums';
import { getElement } from '../../utils/getElement';
// eslint-disable-next-line import/no-cycle
import Garage from '../../containers/Garage/Garage';

class GaragePagination extends Element {
  constructor() {
    super('div', [ClassMap.garage.garagePagination]);
    this.fill();
  }

  private async fill(): Promise<void> {
    const previousButton = new Element('button', [ClassMap.garage.garagePrevious], Buttons.previous).element;
    const nextButton = new Element('button', [ClassMap.garage.garageNext], Buttons.next).element;
    const paginationTitle = new Element('div', [ClassMap.garage.garagePaginationTitle], Content.paginationTitle).element;
    this.element.append(previousButton, paginationTitle, nextButton);
    const page = new Element('span', [ClassMap.garage.garagePaginationPage], `${State.PARAMS_CARS.page}`, Ids.carsPage).element;
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
      State.PARAMS_CARS.page += 1;
    } else {
      State.PARAMS_CARS.page -= 1;
    }
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(new Api()).element;
    garage.replaceWith(garageUpdate);
  }

  private async disableButtons(previousButton: HTMLElement, nextButton: HTMLElement): Promise<void> {
    const data = await new Api().getCars();
    const totalCars = data ? Number(data.countCars) : 0;
    const maxPage = Math.ceil(totalCars / State.PARAMS_CARS.limit);

    if (maxPage === 1 && State.PARAMS_CARS.page === 1) {
      previousButton.setAttribute('disabled', 'true');
      nextButton.setAttribute('disabled', 'true');
    } else if (State.PARAMS_CARS.page === 1) {
      previousButton.setAttribute('disabled', 'true');
      nextButton.removeAttribute('disabled');
    } else if (State.PARAMS_CARS.page === maxPage) {
      previousButton.removeAttribute('disabled');
      nextButton.setAttribute('disabled', 'true');
    } else {
      previousButton.removeAttribute('disabled');
      nextButton.removeAttribute('disabled');
    }
  }
}

export default GaragePagination;
