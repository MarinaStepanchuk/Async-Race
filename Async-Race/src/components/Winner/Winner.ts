import Element from '../Element';
import carImg from '../../constants/carImg';
import { IWinner } from '../../types/interfaces';
import Api from '../../api/Api';

class Winner extends Element {
  private apiService = new Api();

  constructor(private winner: IWinner) {
    super('tr', []);
    this.fill();
  }

  private async fill():Promise<void> {
    const car = await this.apiService.getCar(this.winner.id);

    if (!car) {
      return;
    }

    const number = new Element('td', [], '1').element;
    const carView = new Element('td').element;
    carView.innerHTML = carImg;
    carView.style.fill = car.color;
    const name = new Element('td', [], car.name).element;
    name.style.color = car.color;
    const wins = new Element('td', [], `${this.winner.wins}`).element;
    const time = new Element('td', [], `${this.winner.time}`).element;
    this.element.append(number, carView, name, wins, time);
  }
}

export default Winner;
