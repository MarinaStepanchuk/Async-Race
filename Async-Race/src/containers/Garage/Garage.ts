import './Garage.styles.scss';
import Element from '../../components/Element';
import {
  ClassMap,
  Content,
  Ids,
} from '../../constants/htmlConstants';
import GaragePagination from '../../components/GaragePagination/GaragePagination';
import Race from '../Race/Race';
import Api from '../../api/Api';

class Garage extends Element {
  constructor(private apiService: Api) {
    super('section', [ClassMap.garage.race]);
    this.fill();
  }

  private async fill(): Promise<void> {
    const data = await this.apiService.getCars();
    const countCars = data ? Number(data.countCars) : 0;
    const cars = data ? data.cars : [];
    const header = new Element('div', [ClassMap.garage.garageHeader]).element;
    const headerTitle = new Element('span', [ClassMap.garage.garageHeaderTitle], Content.raceHeader).element;
    const count = new Element('span', [], `${countCars} `, Ids.countCars).element;
    header.append(count, headerTitle);
    const pagination = new GaragePagination().element;
    const race = new Race(cars).element;
    this.element.append(header, pagination, race);
  }
}

export default Garage;
