import './Header.styles.scss';
import Element from '../../components/Element';
import { ClassMap } from '../../constants/htmlConstants';
import { ButtonNames } from '../../types/enums';
import WinnersButton from '../../components/WinnersButton/WinnersButton';
import GarageButton from '../../components/GarageButton/GarageButton';

class Header extends Element {
  constructor(private disabledButton: string) {
    super('header', [ClassMap.header]);
    this.fill();
  }

  private fill(): void {
    const winnersButton = new WinnersButton().element;
    const garageButton = new GarageButton().element;
    this.element.append(garageButton, winnersButton);

    switch (this.disabledButton) {
      case ButtonNames.garage:
        garageButton.setAttribute('disabled', 'true');
        winnersButton.removeAttribute('disabled');
        break;
      case ButtonNames.winners:
        winnersButton.setAttribute('disabled', 'true');
        garageButton.removeAttribute('disabled');
        break;
      default:
        garageButton.removeAttribute('disabled');
        winnersButton.removeAttribute('disabled');
        break;
    }
  }
}

export default Header;
