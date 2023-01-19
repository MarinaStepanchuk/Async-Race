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

export type DefaultStateTypes = {
  PARAMS_CARS: {
    page: number;
    limit: number;
  };
  PARAMS_WINNERS: {
    page: number;
    limit: number;
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC'
  }
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
