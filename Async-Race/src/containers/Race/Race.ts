import './Race.styles.scss';
import Element from '../../components/Element';
import { ClassMap, Ids } from '../../constants/htmlConstants';
import { ICar } from '../../types/interfaces';
import Car from '../../components/Car/Car';
import Api from '../../api/Api';
// eslint-disable-next-line import/no-cycle
import Garage from '../Garage/Garage';
import { getElement } from '../../utils/getElement';
// eslint-disable-next-line import/no-cycle
import UpdateCar from '../../components/UpdateCar/UpdateCar';
import { GarageRaceController } from '../../GarageRaceController/GarageRaceController';

class Race extends Element {
  private raceController;

  constructor(private cars: ICar[], private apiService: Api) {
    super('div', [ClassMap.garage.garageCars]);
    this.fill();
    this.raceController = new GarageRaceController();
  }

  public fill():void {
    const carsElements = this.cars.map((car) => new Car(car).element);
    this.element.append(...carsElements);

    this.element.addEventListener('click', async (event) => {
      const element = event.target as HTMLElement;

      if (element.id.includes(Ids.remove)) {
        this.removeCar(element);
      }

      if (element.id.includes(Ids.select)) {
        const id = Number(element.id.split('-').reverse()[0]);
        new UpdateCar().openCreateBlock(id);
      }

      if (element.id.includes(Ids.start)) {
        const id = Number(element.id.split('-').reverse()[0]);
        this.raceController.startCar(id);
        const stopButton = getElement(`#${Ids.stop}${id}`);
        stopButton.removeAttribute('disabled');
      }

      if (element.id.includes(Ids.stop)) {
        const id = Number(element.id.split('-').reverse()[0]);
        this.raceController.stopCar(id);
        element.setAttribute('disabled', 'true');
      }
    });
  }

  private async removeCar(element: HTMLElement): Promise<void> {
    const id = Number(element.id.split('-').reverse()[0]);
    await this.apiService.deleteCar(id);
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(this.apiService).element;
    garage.replaceWith(garageUpdate);
    await this.apiService.deleteWinner(id);
  }
}

export default Race;
