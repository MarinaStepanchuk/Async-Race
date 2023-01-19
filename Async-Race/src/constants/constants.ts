import { DefaultStateTypes } from '../types/types';

export const baseUrl = 'http://127.0.0.1:3000';

export const Endpoints = {
  GARAGE: `${baseUrl}/garage`,
  ENGINE: `${baseUrl}/engine`,
  WINNERS: `${baseUrl}/winners`,
};

export const body = document.querySelector('#app') as HTMLBodyElement;

export const DefaultState: DefaultStateTypes = {
  PARAMS_CARS: {
    page: 1,
    limit: 7,
  },
  PARAMS_WINNERS: {
    page: 1,
    limit: 10,
    sort: 'id',
    order: 'ASC',
  },
};
