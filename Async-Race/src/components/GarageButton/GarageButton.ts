import Element from '../Element';
import { Buttons, ClassMap } from '../../constants/htmlConstants';
import { PageHashes } from '../../constants/constants';

class GarageButton extends Element {
  constructor() {
    super('button', [ClassMap.buttonToGarage], Buttons.garage);
    this.addListeners();
  }

  public addListeners():void {
    this.element.addEventListener('click', () => {
      window.location.hash = PageHashes.GARAGE;
    });
  }
}

export default GarageButton;
