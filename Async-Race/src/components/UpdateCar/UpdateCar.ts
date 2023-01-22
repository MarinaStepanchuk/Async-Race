import './UpdateCar.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Ids, Types,
} from '../../constants/htmlConstants';

class UpdateCar extends Element {
  constructor() {
    super('form', [ClassMap.garage.form], '', Ids.formCreate);
    this.fill();
  }

  private fill():void {
    const name = new Element('input', [ClassMap.garage.formInput], '', Ids.inputUpdateName).element as HTMLInputElement;
    name.type = Types.inputText;
    const color = new Element('input', [ClassMap.garage.formColor], '', Ids.inputUpdateColor).element as HTMLInputElement;
    color.type = Types.inputColor;
    const submit = new Element('button', [ClassMap.garage.formButton], Buttons.update).element as HTMLButtonElement;
    submit.type = Types.buttonSubmit;
    this.element.append(name, color, submit);
  }
}

export default UpdateCar;
