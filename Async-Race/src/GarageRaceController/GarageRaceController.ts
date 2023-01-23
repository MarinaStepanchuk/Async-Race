import Api from '../api/Api';
import { Ids } from '../constants/htmlConstants';
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
      const data = await this.apiService.startEngine(id);
      if (!data) {
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
      window.cancelAnimationFrame(this.animation)
    } catch (error) {
      console.log(error);
    }
  }

  // public async driveCar(id: number) {
  //   try {
  //     const success = await this._racerService.switchDriveMode(id);

  //     if (success?.status === ResponseStatus.internalServerError) {
  //       if (this._state.getAnimation(id).started) {
  //         this._state.setResultAnimation(id, 'engine breakdown');
  //         this._state.stopAnimation(id);
  //       }

  //       return { id, result: 0 };
  //     }
  //     if (!(success?.status === ResponseStatus.ok)) {
  //       throw new Error(
  //         `${ErrorMessages.noStartDrive} [car id=${id}] (${success?.status}) ${success?.statusText}`,
  //       );
  //     }

  //     if (this._state.getAnimation(id).started) {
  //       // const timeA = this._state.getAnimation(id).time / 1000; // only animation duration time
  //       const time = (Date.now() - this._state.getAnimation(id).startTime) / 1000;

  //       this._state.setResultAnimation(id, `time: ${time}`);

  //       return { id, result: time };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // public async driveTest(id: number) {
  //   return new Promise<{ id: number; result: number }>((resolve, reject) => {
  //     this._racerService
  //       .switchDriveMode(id)
  //       .then((success) => {
  //         if (success?.status === ResponseStatus.internalServerError) {
  //           if (this._state.getAnimation(id).started) {
  //             this._state.setResultAnimation(id, 'engine breakdown');
  //             this._state.stopAnimation(id);
  //           }
  //           reject(false);
  //         } else {
  //           if (!(success?.status === ResponseStatus.ok)) reject();

  //           if (this._state.getAnimation(id).started) {
  //             // const time = this._state.getAnimation(id).time / 1000; // only animation duration time
  //             const time = (Date.now() - this._state.getAnimation(id).startTime) / 1000;

  //             this._state.setResultAnimation(id, `time: ${time}`);

  //             resolve({ id, result: time });
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         throw new Error(error);
  //       });
  //   });
  // }

  // public async stopCar(id: number) {
  //   try {
  //     await this._racerService.stopEngine(id);

  //     this._state.setResultAnimation(id, '');
  //     this._state.stopAnimation(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
