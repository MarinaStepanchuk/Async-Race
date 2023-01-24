import Api from '../api/Api';
import { body } from '../constants/constants';
import { ClassMap, Ids } from '../constants/htmlConstants';
import { RaceMessages } from '../types/enums';
import { IChallenger, IWinner } from '../types/interfaces';
import { createElement } from '../utils/createElement';
import { getDistanceBetweenElements } from '../utils/getDistanceBetweenElements';
import { getElement } from '../utils/getElement';

export class GarageRaceController {
  private apiService;

  private animation: number;

  constructor() {
    this.apiService = new Api();
    this.animation = 0;
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
        this.animation = window.requestAnimationFrame(step);
      }
    };

    this.animation = window.requestAnimationFrame(step);
    const { success } = await this.apiService.drive(id);
    console.log(success, id, car);

    if (!success) {
      window.cancelAnimationFrame(this.animation);
    }

    return { id, success, time: anumationTime };
  }

  public async stopCar(id: number): Promise<void> {
    await this.apiService.stopEngine(id);
    const car = getElement(`#${Ids.car}${id}`);
    car.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(this.animation);
    const startButton = getElement(`#${Ids.start}${id}`);
    startButton.removeAttribute('disabled');
    const selectButton = getElement(`#${Ids.select}${id}`);
    const removeButton = getElement(`#${Ids.remove}${id}`);
    selectButton.removeAttribute('disabled');
    removeButton.removeAttribute('disabled');
  }

  public async startRace(): Promise<Partial<IWinner> | null | undefined> {
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

  private async findWinner(promises: Promise<IChallenger | null>[], idCars: number[]): Promise<Partial<IWinner> | null | undefined> {
    const data = await Promise.race(promises);

    if (!data) {
      return null;
    }

    const { id, success, time } = data;

    if (!success) {
      const failedCarIndex = idCars.findIndex((index) => index === id);
      const restPromises = [...promises.slice(0, failedCarIndex), ...promises.slice(failedCarIndex + 1, promises.length)];
      const restIds = [...idCars.slice(0, failedCarIndex), ...idCars.slice(failedCarIndex + 1, idCars.length)];
      console.log(restIds, restPromises);
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

  // //* -------- RACE -------- *//
  // public async StartRace() {
  //   try {
  //     const cars = this._state.getCars();

  //     if (cars.length === 0) throw new Error(ErrorMessages.noCarsOnPage);

  //     const resArr = cars.map(async (car) => {
  //       await this.startCar(car.id);
  //       return this.driveTest(car.id);
  //     });

  //     const res = await Promise.any(resArr).catch(() => {
  //       throw new Error(ErrorMessages.noCarsFinished);
  //     });

  //     if (!res) throw new Error(ErrorMessages.noCarsFinished);

  //     const { id, result } = res;
  //     this._state.setResultAnimation(id, `WINNER! time: ${result}`);

  //     this.setWinner(id, result);

  //     await Promise.allSettled(resArr);
  //     //
  //   } catch (error) {
  //     if (error) console.log(error);
  //   }
  // }

  // private async setWinner(id: number, newTime: number) {
  //   const winner = await this._racerService.getWinner(id);

  //   if (winner?.status === ResponseStatus.notFound) {
  //     // add new line
  //     await this._racerService.createWinner({ id, wins: 1, time: newTime });

  //     await this._winnersController.getWinners();
  //   } else if (winner?.status === ResponseStatus.ok) {
  //     // upd data
  //     const { wins, time } = winner.data;
  //     newTime = Math.min(newTime, time);
  //     await this._racerService.updateWinner(id, { wins: wins + 1, time: newTime });

  //     await this._winnersController.getWinners();
  //   }
  // }

  // public async ResetRace() {
  //   try {
  //     const cars = this._state.getCars();

  //     const resArr = cars.map((car) => this.stopCar(car.id));
  //     await Promise.all(resArr);

  //     this._controller.getCars();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default GarageRaceController;
