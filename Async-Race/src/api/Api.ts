import {
  ICar, ICars, IWinner, IWinners,
} from '../types/interfaces';
import {
  BodyCar, BodyWinner, DataDistance, Drive, WinnersPageParams,
} from '../types/types';
import { ErrorCodes, ErrorMessages, ResponceStatus } from '../types/enums';
import { garage, engine, winners } from '../constants/constants';

class Api {
  public async getCars(page: number, limit = 7): Promise<ICars> {
    try {
      const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
      return {
        cars: await response.json(),
        countCars: response.headers.get('X-Total-Count'),
      };
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async getCar(id: number): Promise<ICar> {
    try {
      const response = await fetch(`${garage}/${id}`);
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async createCar(bodyCar: BodyCar): Promise<ICar> {
    try {
      const response = await fetch(
        `${garage}`,
        {
          method: 'POST',
          body: JSON.stringify(bodyCar),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async deleteCar(id: number): Promise<ICar> {
    try {
      const response = await fetch(`${garage}/${id}`, { method: 'DELETE' });
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async updateCar(id: number, body: BodyCar): Promise<ICar> {
    try {
      const response = await fetch(
        `${garage}/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async startEngine(id: number): Promise<DataDistance | Error> {
    try {
      const response = await fetch(`${engine}/?id=${id}&status=started`);

      switch (response.status) {
        case ResponceStatus.OK:
          return await response.json();
        case ErrorCodes.NOT_FOUND:
          return new Error(ErrorMessages.NOT_FOUND_CAR);
        case ErrorCodes.BAD_REQUEST:
          return new Error(ErrorMessages.WRONG_PARAMETERS);
        default:
          return new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async stopEngine(id: number): Promise<DataDistance | Error> {
    try {
      const response = await fetch(`${engine}/?id=${id}&status=stopped`);

      switch (response.status) {
        case ResponceStatus.OK:
          return await response.json();
        case ErrorCodes.NOT_FOUND:
          return new Error(ErrorMessages.NOT_FOUND_CAR);
        case ErrorCodes.BAD_REQUEST:
          return new Error(ErrorMessages.WRONG_PARAMETERS);
        default:
          return new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async drive(id: number): Promise<Drive | Error> {
    try {
      const response = await fetch(`${engine}/?id=${id}&status=drive`);

      switch (response.status) {
        case ResponceStatus.OK:
          return await response.json();
        case ErrorCodes.BAD_REQUEST:
          return new Error(ErrorMessages.WRONG_PARAMETERS);
        case ErrorCodes.NOT_FOUND:
          return new Error(ErrorMessages.NOT_FOUND_CAR_TO_START);
        case ErrorCodes.TOO_MANY_REQUESTS:
          return new Error(ErrorMessages.DRIVE_IN_PROGRESS);
        case ErrorCodes.INTERNAL_SERVER_ERROR:
          return new Error(ErrorMessages.TURNED_ENGINE);
        default:
          return new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async getWinners({
    page, limit = 10, sort, order,
  }: WinnersPageParams): Promise<IWinners> {
    try {
      const response = await fetch(`${winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
      return {
        winners: await response.json(),
        countWinners: response.headers.get('X-Total-Count'),
      };
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async getWinner(id: number): Promise<IWinner> {
    try {
      const response = await fetch(`${winners}/${id}`);
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async createWinner(winner: IWinner): Promise<IWinner | Error> {
    try {
      const response = await fetch(
        `${winners}`,
        {
          method: 'POST',
          body: JSON.stringify(winner),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      switch (response.status) {
        case ResponceStatus.OK:
          return await response.json();
        case ErrorCodes.INTERNAL_SERVER_ERROR:
          return new Error(ErrorMessages.DUPLICATE_ID);
        default:
          return new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async deleteWinner(id: number): Promise<IWinner> {
    try {
      const response = await fetch(`${winners}/${id}`, { method: 'DELETE' });
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }

  public async updateWinner(id: number, bodyWinner: BodyWinner): Promise<IWinner> {
    try {
      const response = await fetch(
        `${winners}/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(bodyWinner),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return await response.json();
    } catch {
      throw Error(ErrorMessages.UNKNOWN);
    }
  }
}

export default Api;
