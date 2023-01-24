import './ControlButtons.styles.scss';
import Element from '../Element';
import { Buttons, ClassMap } from '../../constants/htmlConstants';
import { getRandomCarName } from '../../utils/gerRandomCarName';
import { getRandomCarColor } from '../../utils/getRandomCarColor';
import Api from '../../api/Api';
import Garage from '../../containers/Garage/Garage';
// eslint-disable-next-line import/no-cycle
import { getElement } from '../../utils/getElement';
import { amountRandomCars } from '../../constants/constants';
import GarageRaceController from '../../GarageRaceController/GarageRaceController';

class ControlButtons extends Element {
  private raceController;

  constructor() {
    super('div', [ClassMap.garage.controlButtons]);
    this.fill();
    this.raceController = new GarageRaceController();
  }

  private fill():void {
    const race = new Element('button', [ClassMap.garage.buttonRace], Buttons.race).element;
    const reset = new Element('button', [ClassMap.garage.buttonReset], Buttons.reset).element;
    const generate = new Element('button', [ClassMap.garage.buttonGenerate], Buttons.generate).element;
    this.element.append(race, reset, generate);

    generate.addEventListener('click', () => {
      this.generateCars();
    });

    race.addEventListener('click', async () => {
      const winner = await this.raceController.startRace();
      this.raceController.addWinner(winner);
      // console.log(winner);
      // this.raceController.showMessage(winner);
    });

    reset.addEventListener('click', () => {
      this.raceController.resetRace();
    });
  }

  private async generateCars():Promise<void> {
    const apiService = new Api();
    const cars = new Array(amountRandomCars).fill(1).map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));
    await Promise.all(cars.map((car) => apiService.createCar(car)));
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(apiService).element;
    garage.replaceWith(garageUpdate);
  }
}

export default ControlButtons;
