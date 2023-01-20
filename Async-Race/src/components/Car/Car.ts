import './Car.styles.scss';
import Element from '../Element';
import {
  Buttons, ClassMap, Ids,
} from '../../constants/htmlConstants';
import carImg from '../../constants/carImg';
import { ICar } from '../../types/interfaces';

class Car extends Element {
  constructor(private car: ICar) {
    super('div', [ClassMap.carContainer], '', `${Ids.road}${car.id}`);
    this.car = car;
    this.fill();
  }

  private fill():void {
    const buttonsContainer = new Element('div', [ClassMap.carGeneralButtons]).element;
    const road = new Element('div', [ClassMap.road]).element;
    this.element.append(buttonsContainer, road);

    const select = new Element('button', ClassMap.selectCar, Buttons.select, `${Ids.select}${this.car.id}`).element;
    const remove = new Element('button', ClassMap.removeCar, Buttons.remove, `${Ids.remove}${this.car.id}`).element;
    const model = new Element('span', [ClassMap.modelCar], this.car.name, `${Ids.modelCar}${this.car.id}`).element;
    buttonsContainer.append(select, remove, model);

    const launchPad = new Element('div', [ClassMap.launchPad]).element;
    const flag = new Element('div', [ClassMap.flag]).element;
    road.append(launchPad, flag);

    const controls = new Element('div', [ClassMap.carControlPanel]).element;
    const car = new Element('div', [ClassMap.car], '', `${Ids.car}${this.car.id}`).element;
    car.innerHTML = carImg;
    car.style.fill = `${this.car.color}`;
    launchPad.append(controls, car);

    const start = new Element('button', ClassMap.startCar, Buttons.start, `${Ids.start}${this.car.id}`).element;
    const stop = new Element('button', ClassMap.stopCar, Buttons.stop, `${Ids.stop}${this.car.id}`).element;
    controls.append(start, stop);
  }
}

export default Car;
