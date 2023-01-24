import { ICar } from './interfaces';

export type RoutesType = {
  [key: string]: () => void,
};

export type DataDistance = {
  velocity: number;
  distance: number;
};

export type Drive = {
  success: boolean;
};

export type StateTypes = {
  PARAMS_CARS: {
    page: number;
    limit: number;
  };
  PARAMS_WINNERS: {
    page: number;
    limit: number;
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC'
  };
  INPUT_CREATE: string,
  CREATE_COLOR: string,
  INPUT_UPDATE: string,
  UPDATE_COLOR: string,
  SELECT_CAR: ICar | null,
};

export type WinnersPageParams = {
  page: number;
  limit: number;
  sort: 'id' | 'wins' | 'time',
  order: 'ASC' | 'DESC'
};

export type UrlParams = {
  [key: string]: string | number;
};

export type SizeElement = {
  width: number;
  height: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Animation = {
  [key: number]: number
};
