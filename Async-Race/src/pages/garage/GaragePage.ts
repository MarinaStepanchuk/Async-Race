import './GaragePage.styles.scss';
import Header from '../../containers/Header/Header';
import { body } from '../../constants/constants';
import { ButtonNames } from '../../types/enums';
import Element from '../../components/Element';
import CarControls from '../../containers/CarControles/CarControls';
import Garage from '../../containers/Garage/Garage';
import { ClassMap } from '../../constants/htmlConstants';

class GaragePage {
  public render(): void {
    body.innerHTML = '';
    const header = new Header(ButtonNames.garage).element;
    const main = new Element('main', [ClassMap.garagePage]).element;
    const controlsCars = new CarControls().element;
    const gatage = new Garage().element;
    main.append(controlsCars, gatage);
    body.append(header, main);
  }
}

export default GaragePage;
