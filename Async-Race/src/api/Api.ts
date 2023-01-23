import {
  ICar, ICars, IWinner, IWinners,
} from '../types/interfaces';
import {
  DataDistance, Drive,
} from '../types/types';
import {
  StatusCodes, ErrorMessages, RequestMethods, FileTypes, RequestHeaders, MovementStatuses,
} from '../types/enums';
import { Endpoints } from '../constants/constants';
import { getUrlWithParams } from '../utils/getUrlWithParams';
import { State } from '../constants/state';

class Api {
  public async getCars({ page, limit } = State.PARAMS_CARS): Promise<ICars | null> {
    try {
      const URL = getUrlWithParams(Endpoints.GARAGE, { _page: page, _limit: limit });
      const response = await fetch(URL);
      const data = await response.json();
      return {
        cars: data,
        countCars: response.headers.get(RequestHeaders.TOTAL_COUNT),
      };
    } catch {
      return null;
    }
  }

  public async getCar(id: number): Promise<ICar | null> {
    try {
      const URL = getUrlWithParams(Endpoints.GARAGE, {}, id);
      const response = await fetch(URL);
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_CAR);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async createCar(bodyCar: Partial<ICar>): Promise<ICar | null> {
    try {
      const URL = getUrlWithParams(Endpoints.GARAGE);
      const response = await fetch(
        URL,
        {
          method: RequestMethods.POST,
          body: JSON.stringify(bodyCar),
          headers: {
            [RequestHeaders.CONTENT_TYPE]: FileTypes.JSON,
          },
        },
      );
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }

  public async deleteCar(id: number): Promise<Partial<ICar> | null> {
    try {
      const URL = getUrlWithParams(Endpoints.GARAGE, {}, id);
      const response = await fetch(URL, { method: RequestMethods.DELETE });
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }

  public async updateCar(id: number, body: Partial<ICar>): Promise<ICar | null> {
    try {
      const URL = getUrlWithParams(Endpoints.GARAGE, {}, id);
      const response = await fetch(
        URL,
        {
          method: RequestMethods.PUT,
          body: JSON.stringify(body),
          headers: {
            [RequestHeaders.CONTENT_TYPE]: FileTypes.JSON,
          },
        },
      );
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_CAR);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async startEngine(idCar: number): Promise<DataDistance | null> {
    try {
      const URL = getUrlWithParams(Endpoints.ENGINE, { id: idCar, status: MovementStatuses.START });
      const response = await fetch(URL, { method: RequestMethods.PATCH });
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_CAR);
        case StatusCodes.BAD_REQUEST:
          throw new Error(ErrorMessages.WRONG_PARAMETERS);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async stopEngine(idCar: number): Promise<DataDistance | null> {
    try {
      const URL = getUrlWithParams(Endpoints.ENGINE, { id: idCar, status: MovementStatuses.STOP });
      const response = await fetch(URL, { method: RequestMethods.PATCH });
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_CAR);
        case StatusCodes.BAD_REQUEST:
          throw new Error(ErrorMessages.WRONG_PARAMETERS);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async drive(idCar: number): Promise<Drive> {
    try {
      const URL = getUrlWithParams(Endpoints.ENGINE, { id: idCar, status: MovementStatuses.DRIVE });
      const response = await fetch(URL, { method: RequestMethods.PATCH });
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.BAD_REQUEST:
          throw new Error(ErrorMessages.WRONG_PARAMETERS);
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_CAR_TO_START);
        case StatusCodes.TOO_MANY_REQUESTS:
          throw new Error(ErrorMessages.DRIVE_IN_PROGRESS);
        case StatusCodes.INTERNAL_SERVER_ERROR:
          throw new Error(ErrorMessages.TURNED_ENGINE);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return { success: false };
    }
  }

  public async getWinners({
    page, limit, sort, order,
  } = State.PARAMS_WINNERS): Promise<IWinners | null> {
    try {
      const URL = getUrlWithParams(Endpoints.WINNERS, {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
      });
      const response = await fetch(URL);
      const data = await response.json();
      return {
        winners: data,
        countWinners: response.headers.get(RequestHeaders.TOTAL_COUNT),
      };
    } catch {
      return null;
    }
  }

  public async getWinner(id: number): Promise<IWinner | null> {
    try {
      const URL = getUrlWithParams(Endpoints.WINNERS, {}, id);
      const response = await fetch(URL);
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_WINNER);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async createWinner(winner: IWinner): Promise<IWinner | null> {
    try {
      const URL = getUrlWithParams(Endpoints.WINNERS);
      const response = await fetch(
        URL,
        {
          method: RequestMethods.POST,
          body: JSON.stringify(winner),
          headers: {
            [RequestHeaders.CONTENT_TYPE]: FileTypes.JSON,
          },
        },
      );

      switch (response.status) {
        case StatusCodes.OK:
          throw await response.json();
        case StatusCodes.INTERNAL_SERVER_ERROR:
          throw new Error(ErrorMessages.DUPLICATE_ID);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }

  public async deleteWinner(id: number): Promise<Partial<IWinner> | null> {
    try {
      const URL = getUrlWithParams(Endpoints.WINNERS, {}, id);
      const response = await fetch(URL, { method: RequestMethods.DELETE });
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }

  public async updateWinner(id: number, bodyWinner: Partial<IWinner>): Promise<IWinner | null> {
    try {
      const response = await fetch(
        `${Endpoints.WINNERS}/${id}`,
        {
          method: RequestMethods.PUT,
          body: JSON.stringify(bodyWinner),
          headers: {
            [RequestHeaders.CONTENT_TYPE]: FileTypes.JSON,
          },
        },
      );
      const data = await response.json();

      switch (response.status) {
        case StatusCodes.OK:
          return data;
        case StatusCodes.NOT_FOUND:
          throw new Error(ErrorMessages.NOT_FOUND_WINNER);
        default:
          throw new Error(ErrorMessages.UNKNOWN);
      }
    } catch {
      return null;
    }
  }
}

export default Api;
