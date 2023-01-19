import './GarageButton.styles.scss';
import Element from '../Element';
import { ClassMap, Content } from '../../constants/htmlConstants';
import { PageHashes } from '../../constants/constants';

class GarageButton extends Element {
  constructor() {
    super('button', [ClassMap.buttonToGarage], Content.buttonGarage);
    this.addListeners();
  }

  public addListeners():void {
    this.element.addEventListener('click', () => {
      window.location.hash = PageHashes.GARAGE;
    });
  }
}

export default GarageButton;
