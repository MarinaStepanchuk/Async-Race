export type BodyCar = {
  name: string;
  color: string;
};

export type DataDistance = {
  velocity: number;
  distance: number;
};

export type Drive = {
  success: true;
};

export type WinnersPageParams = {
  page: number;
  limit: number;
  sort: 'id' | 'wins' | 'time',
  order: 'ASC' | 'DESC'
};

export type BodyWinner = {
  wins: number;
  time: number
};
