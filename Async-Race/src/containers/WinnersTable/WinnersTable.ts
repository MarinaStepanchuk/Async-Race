import './WinnersTable.styles.scss';
import Element from '../../components/Element';
import {
  Attributes,
  ClassMap, Content, Ids
} from '../../constants/htmlConstants';
import { IWinner } from '../../types/interfaces';
import Winner from '../../components/Winner/Winner';

class WinnerTables extends Element {
  constructor(private winners: IWinner[]) {
    super('table', [ClassMap.winnersTable]);
    this.fill();
  }

  private fill():void {
    this.element.setAttribute(Attributes.cellspacing, '0');
    const head = new Element('thead').element;
    const number = new Element('th', [], Content.tableTitlesNumber).element;
    const car = new Element('th', [], Content.tableTitlesCar).element;
    const name = new Element('th', [], Content.tableTitlesName).element;
    const wins = new Element('th', [ClassMap.winnersWins, ClassMap.sortASC], Content.tableTitlesWins, Ids.sortWins).element;
    const time = new Element('th', [ClassMap.winnersSort, ClassMap.sortDESC], Content.tableTitlesTime, Ids.sortTimes).element;
    head.append(number, car, name, wins, time);
    const body = new Element('tbody').element;
    const winnersElements = this.winners.map((winner) => new Winner(winner).element);
    body.append(...winnersElements);
    this.element.append(head, body);
  }
}

export default WinnerTables;
