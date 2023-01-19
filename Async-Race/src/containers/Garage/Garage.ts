import './Garage.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap, Content, Id,
} from '../../constants/htmlConstants';
import GaragePagination from '../../components/GaragePagination/GaragePagination';
import Race from '../Race/Race';
import Api from '../../api/Api';
import { ICar, ICars } from '../../types/interfaces';

class Garage extends Element {
  private countCars: number;

  private cars: ICar[];

  constructor() {
    super('section', [ClassMap.race]);
    this.countCars = 0;
    this.cars = [];

    this.getCountCars().then((data) => {
      this.countCars = data ? Number(data?.countCars) : 0;
      this.cars = data ? data?.cars : [];
      this.fill();
    });
  }

  private fill(): void {
    const header = new Element('div', [ClassMap.garageHeader]).element;
    const headerTitle = new Element('span', [ClassMap.garageHeaderTitle], Content.raceHeader).element;
    const count = new Element('span', [], `${this.countCars} `, Id.countCars).element;
    header.append(count, headerTitle);
    const pagination = new GaragePagination().element;
    const race = new Race(this.cars).element;
    this.element.append(header, pagination, race);
  }

  private async getCountCars(): Promise<ICars | null> {
    const api = new Api();
    const cars = await api.getCars();
    return cars;
  }
}

export default Garage;
