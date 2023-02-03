import { StateTypes } from '../types/types';
import { defaultColor } from './constants';

export const State: StateTypes = {
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
  INPUT_CREATE: '',
  CREATE_COLOR: defaultColor,
  INPUT_UPDATE: '',
  UPDATE_COLOR: defaultColor,
  SELECT_CAR: null,
};
