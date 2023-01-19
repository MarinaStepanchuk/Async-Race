import './UpdateCar.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Id, Types,
} from '../../constants/htmlConstants';

class UpdateCar extends Element {
  constructor() {
    super('form', [ClassMap.form], '', Id.formCreate);
    this.fill();
  }

  private fill():void {
    const name = new Element('input', [ClassMap.formInput], '', Id.inputUpdateName).element as HTMLInputElement;
    name.type = Types.inputText;
    const color = new Element('input', [ClassMap.formColor], '', Id.inputUpdateColor).element as HTMLInputElement;
    color.type = Types.inputColor;
    const submit = new Element('button', [ClassMap.formButton], Buttons.update).element as HTMLButtonElement;
    submit.type = Types.buttonSubmit;
    this.element.append(name, color, submit);
  }
}

export default UpdateCar;
