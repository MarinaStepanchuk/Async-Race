import './CarControls.styles.scss';
import Element from '../../components/Element';
import { ClassMap } from '../../constants/htmlConstants';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import CarCreater from '../../components/CarCreater/CarCreater';
import СarUpdater from '../../components/СarUpdater/СarUpdater';

class CarControls extends Element {
  constructor() {
    super('section', [ClassMap.garage.garageControls]);
    this.fill();
  }

  private fill(): void {
    const buttons = new ControlButtons().element;
    const createCar = new CarCreater().element;
    const updateCar = new СarUpdater().element;
    const forms = new Element('div', [ClassMap.garage.garageForms]).element;
    forms.append(createCar, updateCar);
    this.element.append(forms, buttons);
  }
}

export default CarControls;
