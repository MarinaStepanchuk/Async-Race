import Element from '../Element';
import { Buttons, ClassMap } from '../../constants/htmlConstants';
import { PageHashes } from '../../constants/constants';

class WinnersButton extends Element {
  constructor() {
    super('button', [ClassMap.buttonToWinners], Buttons.winners);
    this.addListeners();
  }

  public addListeners():void {
    this.element.addEventListener('click', () => {
      window.location.hash = PageHashes.WINNERS;
    });
  }
}

export default WinnersButton;
