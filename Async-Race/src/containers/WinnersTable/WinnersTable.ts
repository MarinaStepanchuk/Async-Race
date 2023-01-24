import './WinnersTable.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap,
  Content,
  Ids,
} from '../../constants/htmlConstants';
import { IWinner } from '../../types/interfaces';
import Winner from '../../components/Winner/Winner';
import { State } from '../../constants/state';
import { Order, Sort } from '../../types/enums';
import Api from '../../api/Api';

class WinnerTables extends Element {
  constructor(private winners: IWinner[]) {
    super('table', [ClassMap.winners.winnersTable]);
    this.fill();
  }

  private fill():void {
    this.element.setAttribute('cellspacing', '0');
    const head = new Element('thead').element;
    const number = new Element('th', [], Content.tableTitlesNumber).element;
    const car = new Element('th', [], Content.tableTitlesCar).element;
    const name = new Element('th', [], Content.tableTitlesName).element;
    const wins = new Element('th', [ClassMap.winners.winnersWins], Content.tableTitlesWins, Ids.sortWins).element;
    const time = new Element('th', [ClassMap.winners.winnersSort], Content.tableTitlesTime, Ids.sortTimes).element;
    head.append(number, car, name, wins, time);
    const body = new Element('tbody').element;
    this.fillBodyTable(body);
    this.element.append(head, body);

    if (State.PARAMS_WINNERS.sort === Sort.WINS && State.PARAMS_WINNERS.order === Order.ASC) {
      wins.classList.add(ClassMap.winners.sortASC);
    }

    if (State.PARAMS_WINNERS.sort === Sort.WINS && State.PARAMS_WINNERS.order === Order.DESC) {
      wins.classList.add(ClassMap.winners.sortDESC);
    }

    if (State.PARAMS_WINNERS.sort === Sort.TIME && State.PARAMS_WINNERS.order === Order.ASC) {
      time.classList.add(ClassMap.winners.sortASC);
    }

    if (State.PARAMS_WINNERS.sort === Sort.TIME && State.PARAMS_WINNERS.order === Order.DESC) {
      time.classList.add(ClassMap.winners.sortDESC);
    }

    wins.addEventListener('click', async () => {
      if (State.PARAMS_WINNERS.sort !== Sort.WINS) {
        time.classList.remove(ClassMap.winners.sortASC);
        time.classList.remove(ClassMap.winners.sortDESC);
        wins.classList.add(ClassMap.winners.sortASC);
        State.PARAMS_WINNERS.sort = Sort.WINS;
        State.PARAMS_WINNERS.order = Order.ASC;
      } else if (wins.classList.contains(ClassMap.winners.sortASC)) {
        wins.classList.remove(ClassMap.winners.sortASC);
        wins.classList.add(ClassMap.winners.sortDESC);
        State.PARAMS_WINNERS.sort = Sort.WINS;
        State.PARAMS_WINNERS.order = Order.DESC;
      } else {
        wins.classList.remove(ClassMap.winners.sortDESC);
        wins.classList.add(ClassMap.winners.sortASC);
        State.PARAMS_WINNERS.sort = Sort.WINS;
        State.PARAMS_WINNERS.order = Order.ASC;
      }
      this.resetTable(body);
    });

    time.addEventListener('click', async () => {
      if (State.PARAMS_WINNERS.sort !== Sort.TIME) {
        wins.classList.remove(ClassMap.winners.sortASC);
        wins.classList.remove(ClassMap.winners.sortDESC);
        time.classList.add(ClassMap.winners.sortASC);
        State.PARAMS_WINNERS.sort = Sort.TIME;
        State.PARAMS_WINNERS.order = Order.ASC;
      } else if (time.classList.contains(ClassMap.winners.sortASC)) {
        time.classList.remove(ClassMap.winners.sortASC);
        time.classList.add(ClassMap.winners.sortDESC);
        State.PARAMS_WINNERS.sort = Sort.TIME;
        State.PARAMS_WINNERS.order = Order.DESC;
      } else {
        time.classList.remove(ClassMap.winners.sortDESC);
        time.classList.add(ClassMap.winners.sortASC);
        State.PARAMS_WINNERS.sort = Sort.TIME;
        State.PARAMS_WINNERS.order = Order.ASC;
      }
      this.resetTable(body);
    });
  }

  private fillBodyTable(body: HTMLElement): void {
    const winnersElements = this.winners.map((winner, index) => new Winner(winner, index).element);
    body.append(...winnersElements);
  }

  private async resetTable(body: HTMLElement): Promise<void> {
    const bodyTable = body;
    const data = await new Api().getWinners(State.PARAMS_WINNERS);
    const winners = data ? data?.winners : [];
    this.winners = winners;
    bodyTable.replaceChildren();
    this.fillBodyTable(body);
  }
}

export default WinnerTables;
