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
import GarageRaceController from '../../services/RaceController';

class ControlButtons extends Element {
  private raceController;
  private apiService;

  constructor() {
    super('div', [ClassMap.garage.controlButtons]);
    this.fill();
    this.raceController = new GarageRaceController();
    this.apiService = new Api();
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
      const winnersButton = getElement(`.${ClassMap.buttonToWinners}`);
      winnersButton.setAttribute('disabled', 'true');
      const previousButton = getElement(`.${ClassMap.garage.garagePrevious}`);
      const nextButton = getElement(`.${ClassMap.garage.garageNext}`);
      previousButton.setAttribute('disabled', 'true');
      nextButton.setAttribute('disabled', 'true');
      const winner = await this.raceController.startRace();
      await this.raceController.addWinner(winner);
      winnersButton.removeAttribute('disabled');
      previousButton.removeAttribute('disabled');
      nextButton.removeAttribute('disabled');
    });

    reset.addEventListener('click', async () => {
      await this.raceController.resetRace();
      const stopCarButtons = [...document.querySelectorAll(`.${ClassMap.garage.stopCar[1]}`)];
      stopCarButtons.forEach((button) => {
        button.setAttribute('disabled', 'true');
      });
    });
  }

  private async generateCars():Promise<void> {
    const cars = new Array(amountRandomCars).fill(1).map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));
    await Promise.all(cars.map((car) => this.apiService.createCar(car)));
    const garage = getElement(`.${ClassMap.garage.race}`);
    const garageUpdate = new Garage(this.apiService).element;
    garage.replaceWith(garageUpdate);
  }
}

export default ControlButtons;
