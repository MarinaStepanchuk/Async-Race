import './Race.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap, Content,
} from '../../constants/htmlConstants';
import { ICar } from '../../types/interfaces';

class Race extends Element {
  constructor(private cars: ICar[]) {
    super('div', [ClassMap.garageCars]);
    this.cars = cars;
    // this.fill();
  }

  // private fill():void {

  // }
}

export default Race;
