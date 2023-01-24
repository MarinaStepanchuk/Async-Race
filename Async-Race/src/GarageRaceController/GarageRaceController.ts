import Api from '../api/Api';
import { body } from '../constants/constants';
import { ClassMap, Ids } from '../constants/htmlConstants';
import { RaceMessages } from '../types/enums';
import { IChallenger, IWinner, IWinnerData } from '../types/interfaces';
import { createElement } from '../utils/createElement';
import { getDistanceBetweenElements } from '../utils/getDistanceBetweenElements';
import { getElement } from '../utils/getElement';
import { Animation } from '../types/types';

export class GarageRaceController {
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
    const anumationTime = Math.round(distance / velocity);
    const car = getElement(`#${Ids.car}${id}`);
    const finish = getElement(`#${Ids.finish}${id}`);
    const distanceBetweenElements = getDistanceBetweenElements(car, finish);

    let start: number;

    const step = (timestamp: number): void => {
      if (!start) {
        start = timestamp;
      }

      const time = timestamp - start;
      const passed = Math.round(time * (distanceBetweenElements / anumationTime));
      car.style.transform = `translateX(${Math.min(passed, distanceBetweenElements)}px)`;

      if (passed < distanceBetweenElements) {
        this.animations[id] = window.requestAnimationFrame(step);
      }
    };

    this.animations[id] = window.requestAnimationFrame(step);

    const { success } = await this.apiService.drive(id);

    if (!success) {
      window.cancelAnimationFrame(this.animations[id]);
    }

    return { id, success, time: anumationTime };
  }

  public async stopCar(id: number): Promise<void> {
    await this.apiService.stopEngine(id);
    const car = getElement(`#${Ids.car}${id}`);
    car.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(this.animations[id]);
    const startButton = getElement(`#${Ids.start}${id}`);
    startButton.removeAttribute('disabled');
    const selectButton = getElement(`#${Ids.select}${id}`);
    const removeButton = getElement(`#${Ids.remove}${id}`);
    selectButton.removeAttribute('disabled');
    removeButton.removeAttribute('disabled');
  }

  public async startRace(): Promise<IWinnerData | null | undefined> {
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

  private async findWinner(promises: Promise<IChallenger | null>[], idCars: number[]): Promise<IWinnerData | null | undefined> {
    const data = await Promise.race(promises);

    if (!data) {
      return null;
    }

    const { id, success, time } = data;

    if (!success) {
      const failedCarIndex = idCars.findIndex((index) => index === id);
      const restPromises = [...promises.slice(0, failedCarIndex), ...promises.slice(failedCarIndex + 1, promises.length)];
      const restIds = [...idCars.slice(0, failedCarIndex), ...idCars.slice(failedCarIndex + 1, idCars.length)];
      return this.findWinner(restPromises, restIds);
    }
    const winner = { id, time: +(time / 1000).toFixed(2) };
    this.showMessage(winner);
    return winner;
  }

  public showMessage(winner: Partial<IWinner> | null | undefined): void {
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
    message.remove();
  }

  public async addWinner(winner: IWinnerData | null | undefined): Promise<void> {
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

export default GarageRaceController;
