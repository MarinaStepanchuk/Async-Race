import './ControlButtons.styles.scss';
import Element from '../Element';
import { Buttons, ClassMap } from '../../constants/htmlConstants';

class ControlButtons extends Element {
  constructor() {
    super('div', [ClassMap.controlButtons]);
    this.fill();
  }

  private fill():void {
    const race = new Element('button', [ClassMap.buttonRace], Buttons.race).element;
    const reset = new Element('button', [ClassMap.buttonReset], Buttons.reset).element;
    const generate = new Element('button', [ClassMap.buttonGenerate], Buttons.generate).element;
    this.element.append(race, reset, generate);
  }
}

export default ControlButtons;
