import './Winner.styles.scss';
import Element from '../Element';
import carImg from '../../constants/carImg';
import { IWinner, ICar } from '../../types/interfaces';
import Api from '../../api/Api';

class Winner extends Element {
  constructor(private winner: IWinner) {
    super('tr', []);
    this.fill();
  }

  private async fill():Promise<void> {
    const car = await this.getCar(this.winner.id);

    if (!car) {
      return;
    }

    const number = new Element('td', [], '1').element;
    const carView = new Element('td').element;
    carView.innerHTML = carImg;
    carView.style.fill = car.color;
    const name = new Element('td', [], car.name).element;
    const wins = new Element('td', [], `${this.winner.wins}`).element;
    const time = new Element('td', [], `${this.winner.time}`).element;
    this.element.append(number, carView, name, wins, time);
  }

  private async getCar(id: number):Promise<ICar | null> {
    const api = new Api();
    const car = await api.getCar(id);
    return car;
  }
}

export default Winner;
