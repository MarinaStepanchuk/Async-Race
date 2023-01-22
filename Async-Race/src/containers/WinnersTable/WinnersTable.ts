import './WinnersTable.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap,
  Content,
  Ids,
} from '../../constants/htmlConstants';
import { IWinner } from '../../types/interfaces';
import Winner from '../../components/Winner/Winner';

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
    const wins = new Element('th', [ClassMap.winners.winnersWins, ClassMap.winners.sortASC], Content.tableTitlesWins, Ids.sortWins).element;
    const time = new Element('th', [ClassMap.winners.winnersSort, ClassMap.winners.sortDESC], Content.tableTitlesTime, Ids.sortTimes).element;
    head.append(number, car, name, wins, time);
    const body = new Element('tbody').element;
    const winnersElements = this.winners.map((winner) => new Winner(winner).element);
    body.append(...winnersElements);
    this.element.append(head, body);
  }
}

export default WinnerTables;
