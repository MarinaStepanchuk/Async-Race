import './WinnersButton.styles.scss';
import Element from '../Element';
import { ClassMap, Content } from '../../constants/htmlConstants';
import { PageHashes } from '../../constants/constants';

class WinnersButton extends Element {
  constructor() {
    super('button', [ClassMap.buttonToGarage], Content.buttonWinners);
    // this.fill();
    this.addListeners();
  }

  // public fill(): void {
  //   const linkWinners = new Element('a', [ClassMap.linkWinners], Content.linkWinners).element as HTMLLinkElement;
  //   linkWinners.href = garageLink;
  //   this.element.append(linkWinners);
  // }

  public addListeners():void {
    this.element.addEventListener('click', () => {
      window.location.hash = PageHashes.WINNERS;
    });
  }
}

export default WinnersButton;
