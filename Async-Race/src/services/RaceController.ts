import Api from '../api/Api';
import { body } from '../constants/constants';
import { ClassMap, Ids } from '../constants/htmlConstants';
import { RaceMessages } from '../types/enums';
import { IChallenger, IWinner, IWinnerData } from '../types/interfaces';
import { createElement } from '../utils/createElement';
import { getDistanceBetweenElements } from '../utils/getDistanceBetweenElements';
import { getElement } from '../utils/getElement';
import { Animation } from '../types/types';

class RaceController {
  private apiService;

  private animations: Animation = {};

  constructor() {
    this.apiService = new Api();
  }

  public async startCar(id: number): Promise<IChallenger | null> {
    const startButton = getElement(`#${Ids.start}${id}`);
    const selectButton = getElement(`#${Ids.select}${id}`);
    const removeButton = getElement(`#${Ids.remove}${id}`);
    selectButton.setAttribute('disabled', 'true');
    removeButton.setAttribute('disabled', 'true');
    startButton.setAttribute('disabled', 'true');

    const data = await this.apiService.startEngine(id);

    if (!data) {
      selectButton.removeAttribute('disabled');
      removeButton.removeAttribute('disabled');
      startButton.removeAttribute('disabled');
      return null;
    }

    const { velocity, distance } = data;
    const time = Math.round(distance / velocity);
    const car = getElement(`#${Ids.car}${id}`);
    const finish = getElement(`#${Ids.finish}${id}`);
    const distanceBetweenElements = getDistanceBetweenElements(car, finish);

    let start: number;

    const step = (timestamp: number): void => {
      if (!start) {
        start = timestamp;
      }

      const animationTime = timestamp - start;
      const passed = Math.round(animationTime * (distanceBetweenElements / time));
      car.style.transform = `translateX(${Math.min(passed, distanceBetweenElements)}px)`;

      if (passed < distanceBetweenElements) {
        this.animations[id] = requestAnimationFrame(step);
      }
    };

    this.animations[id] = requestAnimationFrame(step);

    const { success } = await this.apiService.drive(id);

    if (!success) {
      cancelAnimationFrame(this.animations[id]);
    }

    return { id, success, time };
  }

  public async stopCar(id: number): Promise<void> {
    await this.apiService.stopEngine(id);
    const car = getElement(`#${Ids.car}${id}`);
    car.style.transform = 'translateX(0)';
    cancelAnimationFrame(this.animations[id]);
    const startButton = getElement(`#${Ids.start}${id}`);
    startButton.removeAttribute('disabled');
    const selectButton = getElement(`#${Ids.select}${id}`);
    selectButton.removeAttribute('disabled');
    const removeButton = getElement(`#${Ids.remove}${id}`);
    removeButton.removeAttribute('disabled');
  }

  public async startRace(): Promise<IWinnerData | null> {
    const stopCarButtons = [...document.querySelectorAll(`.${ClassMap.garage.stopCar[1]}`)];
    stopCarButtons.forEach((button) => {
      button.setAttribute('disabled', 'true');
    });
    const raceButton = getElement(`.${ClassMap.garage.buttonRace}`);
    const generateButton = getElement(`.${ClassMap.garage.buttonGenerate}`);
    const resetButton = getElement(`.${ClassMap.garage.buttonReset}`);
    raceButton.setAttribute('disabled', 'true');
    generateButton.setAttribute('disabled', 'true');
    resetButton.setAttribute('disabled', 'true');
    const cars = [...document.querySelectorAll(`.${ClassMap.garage.car}`)];
    const idCars = cars.map((car) => Number(car.id.split('-').reverse()[0]));
    const promises = idCars.map((id) => this.startCar(id));
    const winner = await this.findWinner(promises, idCars);
    resetButton.removeAttribute('disabled');
    return winner;
  }

  private async findWinner(
    promises: Promise<IChallenger | null>[],
    idCars: number[],
  ): Promise<IWinnerData | null> {
    const data = await Promise.race(promises);

    if (!data) {
      return null;
    }

    const { id, success, time } = data;

    if (!success) {
      const failedCarIndex = idCars.findIndex((index) => index === id);
      promises.splice(failedCarIndex, 1);
      idCars.splice(failedCarIndex, 1);
      return this.findWinner(promises, idCars);
    }
    const winner = { id, time: +(time / 1000).toFixed(2) };
    this.showMessage(winner);
    return winner;
  }

  public showMessage(winner: Partial<IWinner> | null): void {
    const message = createElement({ tag: 'div', classList: [ClassMap.garage.message] });

    if (!winner) {
      message.textContent = RaceMessages.NOT_FOUND_WINNER;
    } else {
      const nameWinner = getElement(`#${Ids.modelCar}${winner.id}`).innerText;
      message.textContent = `${RaceMessages.CONGRATILATION}${nameWinner} (${winner.time}sec)`;
    }

    body.append(message);
  }

  public async resetRace(): Promise<void> {
    const cars = [...document.querySelectorAll(`.${ClassMap.garage.car}`)];
    const idCars = cars.map((car) => Number(car.id.split('-').reverse()[0]));
    const promises = idCars.map((id) => this.stopCar(id));
    await Promise.all(promises);
    const stopCarButtons = [...document.querySelectorAll(`.${ClassMap.garage.stopCar[1]}`)];
    stopCarButtons.forEach((button) => {
      button.removeAttribute('disabled');
    });
    const raceButton = getElement(`.${ClassMap.garage.buttonRace}`);
    const generateButton = getElement(`.${ClassMap.garage.buttonGenerate}`);
    raceButton.removeAttribute('disabled');
    generateButton.removeAttribute('disabled');
    const message = getElement(`.${ClassMap.garage.message}`);
    message?.remove();
  }

  public async addWinner(winner: IWinnerData | null): Promise<void> {
    if (!winner) {
      return;
    }

    const { id, time } = winner;
    const existingWinner = await this.apiService.getWinner(id);

    if (!existingWinner) {
      await this.apiService.createWinner({ id, wins: 1, time });
    } else {
      const updateWins = existingWinner.wins + 1;
      const updateTime = time < existingWinner.time ? time : existingWinner.time;
      await this.apiService.updateWinner(id, { wins: updateWins, time: updateTime });
    }
  }
}

export default RaceController;
