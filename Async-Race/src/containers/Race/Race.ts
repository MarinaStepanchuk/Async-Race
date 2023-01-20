import './Race.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap,
} from '../../constants/htmlConstants';
import { ICar } from '../../types/interfaces';
import Car from '../../components/Car/Car';

class Race extends Element {
  constructor(private cars: ICar[]) {
    super('div', [ClassMap.garageCars]);
    this.cars = cars;
    this.fill();
  }

  private fill():void {
    const carsElements = this.cars.map((car) => new Car(car).element);
    this.element.append(...carsElements);
  }
}

export default Race;
