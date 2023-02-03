import './WinnersSubheader.styles.scss';
import Element from '../Element';
import {
  ClassMap, Content, Ids,
} from '../../constants/htmlConstants';

class WinnersSubheader extends Element {
  constructor(private countWinners: number) {
    super('h2', [ClassMap.winners.winnersHeader]);
    this.fill();
  }

  private fill():void {
    const headerTitle = new Element('span', [ClassMap.winners.winnersHeaderTitle], Content.winnersHeader).element;
    const count = new Element('span', [], `${this.countWinners} `, Ids.countWinners).element;
    this.element.append(count, headerTitle);
  }
}

export default WinnersSubheader;
