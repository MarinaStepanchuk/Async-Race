import './СarUpdater.styles.scss';
import Element from '../Element';
import {
  Buttons,
  ClassMap,
  Ids,
  Types,
  defaultColor,
} from '../../constants/htmlConstants';
import { getElement } from '../../utils/getElement';
// eslint-disable-next-line import/no-cycle
import Garage from '../../containers/Garage/Garage';
import Api from '../../api/Api';
import { State } from '../../constants/state';

class СarUpdater extends Element {
  public apiService = new Api();

  constructor() {
    super('form', [ClassMap.garage.form], '');
    this.fill();
  }

  private fill():void {
    const name = new Element('input', [ClassMap.garage.formInput], '', Ids.inputUpdateName).element as HTMLInputElement;
    name.type = Types.inputText;

    const color = new Element('input', [ClassMap.garage.formColor], '', Ids.inputUpdateColor).element as HTMLInputElement;
    color.type = Types.inputColor;
    const submit = new Element('button', [ClassMap.garage.formButton], Buttons.update, Ids.formUpdate).element as HTMLButtonElement;
    submit.type = Types.buttonSubmit;
    this.element.append(name, color, submit);

    if (State.SELECT_CAR) {
      submit.removeAttribute('disabled');
      name.removeAttribute('disabled');
      color.removeAttribute('disabled');
      name.value = State.INPUT_UPDATE;
      color.value = State.UPDATE_COLOR;
    } else {
      name.setAttribute('disabled', 'true');
      color.setAttribute('disabled', 'true');
      submit.setAttribute('disabled', 'true');
    }

    name.addEventListener('input', () => {
      State.INPUT_UPDATE = name.value;
    });

    color.addEventListener('input', () => {
      State.UPDATE_COLOR = color.value;
    });

    submit.addEventListener('click', (event) => {
      event.preventDefault();
      this.updateCar(name, color);
      name.setAttribute('disabled', 'true');
      color.setAttribute('disabled', 'true');
      submit.setAttribute('disabled', 'true');
      color.value = defaultColor;
      name.value = '';
      State.SELECT_CAR = null;
    });
  }

  public async openCreateBlock(id: number): Promise<void> {
    const car = await this.apiService.getCar(id);

    if (car) {
      State.SELECT_CAR = car;
      const submit = getElement(`#${Ids.formUpdate}`);
      submit.removeAttribute('disabled');
      const inputName = getElement(`#${Ids.inputUpdateName}`) as HTMLInputElement;
      inputName.removeAttribute('disabled');
      inputName.value = car.name;
      const inputColor = getElement(`#${Ids.inputUpdateColor}`) as HTMLInputElement;
      inputColor.value = car.color;
      inputColor.removeAttribute('disabled');
    }
  }

  private async updateCar(newName: HTMLInputElement, newColor: HTMLInputElement): Promise<void> {
    const car = State.SELECT_CAR;

    if (!car) {
      return;
    }

    await this.apiService.updateCar(car.id, { name: newName.value, color: newColor.value });
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(this.apiService).element;
    garage.replaceWith(garageUpdate);
  }
}

export default СarUpdater;
