import './WinnersSubheader.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap, Content, Ids,
} from '../../constants/htmlConstants';

class WinnersSubheader extends Element {
  constructor(private countWinners: number) {
    super('h2', [ClassMap.winnersHeader]);
    this.countWinners = countWinners
    this.fill();
  }

  private fill():void {
    const headerTitle = new Element('span', [ClassMap.winnersHeaderTitle], Content.winnersHeader).element;
    const count = new Element('span', [], `${this.countWinners} `, Ids.countWinners).element;
    this.element.append(count, headerTitle);
  }
}

export default WinnersSubheader;
