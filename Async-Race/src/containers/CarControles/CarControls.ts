import './CarControls.styles.scss';
import Element from '../../components/Element';
import { ClassMap } from '../../constants/htmlConstants';
import ControlButtons from '../../components/ControlButtons/ControlButtons';
import CreateCar from '../../components/CreateCar/CreateCar';
import UpdateCar from '../../components/UpdateCar/UpdateCar';

class CarControls extends Element {
  constructor() {
    super('section', [ClassMap.carControls]);
    this.fill();
  }

  private fill(): void {
    const buttons = new ControlButtons().element;
    const createCar = new CreateCar().element;
    const updateCar = new UpdateCar().element;
    const forms = new Element('div', [ClassMap.carForms]).element;
    this.element.append(forms, buttons);
    forms.append(createCar, updateCar);
  }
}

export default CarControls;
