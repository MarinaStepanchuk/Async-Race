import Api from '../api/Api';
import { ClassMap, Ids } from '../constants/htmlConstants';
import { getDistanceBetweenElements } from '../utils/getDistanceBetweenElements';
import { getElement } from '../utils/getElement';

export class GarageRaceController {
  private apiService;

  private animation: number;

  constructor() {
    this.apiService = new Api();
    this.animation = 0;
  }

  public async startCar(id: number): Promise<void> {
    try {
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
        return;
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

      if (!success) {
        window.cancelAnimationFrame(this.animation);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async stopCar(id: number): Promise<void> {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  public async startRace(): Promise<void> {
    const raceButton = getElement(`.${ClassMap.garage.buttonRace}`);
    const generateButton = getElement(`.${ClassMap.garage.buttonGenerate}`);
    raceButton.setAttribute('disabled', 'true');
    generateButton.setAttribute('disabled', 'true');
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
