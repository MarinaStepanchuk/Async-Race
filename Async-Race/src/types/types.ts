export type DataDistance = {
  velocity: number;
  distance: number;
};

export type Drive = {
  success: boolean;
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
