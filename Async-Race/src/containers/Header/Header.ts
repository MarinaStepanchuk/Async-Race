import './Header.styles.scss';
import Element from '../../components/Element';
import { Attributes, ClassMap } from '../../constants/htmlConstants';
import { ButtonNames } from '../../types/enums';
import WinnersButton from '../../components/WinnersButton/WinnersButton';
import GarageButton from '../../components/GarageButton/GarageButton';

class Header extends Element {
  constructor(private disabledButton: string) {
    super('header', [ClassMap.header]);
    this.disabledButton = disabledButton;
    this.fill();
  }

  private fill(): void {
    const winnersButton = new WinnersButton().element;
    const garageButton = new GarageButton().element;
    this.element.append(garageButton, winnersButton);

    switch (this.disabledButton) {
      case ButtonNames.garage:
        garageButton.setAttribute(Attributes.disabled, 'true');
        winnersButton.removeAttribute(Attributes.disabled);
        break;
      case ButtonNames.winners:
        winnersButton.setAttribute(Attributes.disabled, 'true');
        garageButton.removeAttribute(Attributes.disabled);
        break;
      default:
        garageButton.removeAttribute('disabled');
        winnersButton.removeAttribute('disabled');
        break;
    }
  }
}

export default Header;
