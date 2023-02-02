import Element from '../Element';
import {
  Buttons,
  ClassMap,
  defaultColor,
  Ids,
  Types,
} from '../../constants/htmlConstants';
import Api from '../../api/Api';
import { getElement } from '../../utils/getElement';
import Garage from '../../containers/Garage/Garage';
import { State } from '../../constants/state';

class CarCreater extends Element {
  public apiService;

  constructor() {
    super('form', [ClassMap.garage.form], '');
    this.fill();
    this.apiService = new Api();
  }

  private fill():void {
    const name = new Element('input', [ClassMap.garage.formInput], '', Ids.inputCreateName).element as HTMLInputElement;
    name.type = Types.inputText;
    name.value = State.INPUT_CREATE;
    const color = new Element('input', [ClassMap.garage.formColor], '', Ids.inputCreateColor).element as HTMLInputElement;
    color.type = Types.inputColor;
    color.value = State.CREATE_COLOR;
    const submit = new Element('button', [ClassMap.garage.formButton], Buttons.create, Ids.formCreate).element as HTMLButtonElement;
    submit.type = Types.buttonSubmit;
    this.element.append(name, color, submit);

    name.addEventListener('input', () => {
      State.INPUT_CREATE = name.value;
    });

    color.addEventListener('input', () => {
      State.CREATE_COLOR = color.value;
    });

    submit.addEventListener('click', (event) => {
      event.preventDefault();
      this.createNewCar(name, color);
    });
  }

  private async createNewCar(name: HTMLInputElement, color: HTMLInputElement): Promise<void> {
    const inputName = name;
    const inputColor = color;
    await this.apiService.getCars();
    await this.apiService.createCar({ name: inputName.value, color: inputColor.value });
    inputName.value = '';
    State.INPUT_CREATE = '';
    inputColor.value = defaultColor;
    State.CREATE_COLOR = defaultColor;
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(this.apiService).element;
    garage.replaceWith(garageUpdate);
  }
}

export default CarCreater;
