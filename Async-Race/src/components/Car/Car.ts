import './Car.styles.scss';
import Element from '../Element';
import {
  Buttons,
  ClassMap,
  Ids,
} from '../../constants/htmlConstants';
import carImg from '../../constants/carImg';
import { ICar } from '../../types/interfaces';

class Car extends Element {
  constructor(private car: ICar) {
    super('div', [ClassMap.garage.carContainer], '', `${Ids.road}${car.id}`);
    this.fill();
  }

  private fill():void {
    const buttonsContainer = new Element('div', [ClassMap.garage.carGeneralButtons]).element;
    const road = new Element('div', [ClassMap.garage.road]).element;
    this.element.append(buttonsContainer, road);

    const select = new Element('button', ClassMap.garage.selectCar, Buttons.select, `${Ids.select}${this.car.id}`).element;
    const remove = new Element('button', ClassMap.garage.removeCar, Buttons.remove, `${Ids.remove}${this.car.id}`).element;
    const model = new Element('span', [ClassMap.garage.modelCar], this.car.name, `${Ids.modelCar}${this.car.id}`).element;
    buttonsContainer.append(select, remove, model);

    const launchPad = new Element('div', [ClassMap.garage.launchPad]).element;
    const flag = new Element('div', [ClassMap.garage.flag]).element;
    road.append(launchPad, flag);

    const controls = new Element('div', [ClassMap.garage.carControlPanel]).element;
    const car = new Element('div', [ClassMap.garage.car], '', `${Ids.car}${this.car.id}`).element;
    car.innerHTML = carImg;
    car.style.fill = `${this.car.color}`;
    launchPad.append(controls, car);

    const start = new Element('button', ClassMap.garage.startCar, Buttons.start, `${Ids.start}${this.car.id}`).element;
    const stop = new Element('button', ClassMap.garage.stopCar, Buttons.stop, `${Ids.stop}${this.car.id}`).element;
    controls.append(start, stop);
  }
}

export default Car;
