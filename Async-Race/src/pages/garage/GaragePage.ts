import './GaragePage.styles.scss';
import Header from '../../containers/Header/Header';
import { body } from '../../constants/constants';
import { ButtonNames } from '../../types/enums';
import Element from '../../components/Element';
import CarControls from '../../containers/CarControles/CarControls';
import Garage from '../../containers/Garage/Garage';
import { ClassMap } from '../../constants/htmlConstants';
import Api from '../../api/Api';

class GaragePage {
  public render(): void {
    body.innerHTML = '';
    const header = new Header(ButtonNames.GARAGE).element;
    const main = new Element('main', [ClassMap.garage.garagePage]).element;
    const controlsCars = new CarControls().element;
    const garage = new Garage(new Api()).element;
    main.append(controlsCars, garage);
    body.append(header, main);
  }
}

export default GaragePage;
