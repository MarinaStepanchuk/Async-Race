export const baseUrl = 'http://127.0.0.1:3000';

export const Endpoints = {
  GARAGE: `${baseUrl}/garage`,
  ENGINE: `${baseUrl}/engine`,
  WINNERS: `${baseUrl}/winners`,
};

export const PageHashes = {
  GARAGE: '#/garage',
  WINNERS: '#/winners',
};

export const body = document.querySelector('#app') as HTMLBodyElement;

export const CarBrands = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Volkswagen', 'Mitsubishi', 'Tesla', 'Land Rover'];

export const CarModels = ['A8', 'M2', 'CR-V', 'CX-30', 'K-900', 'Creta', 'Maybach', 'Vitara', 'Tucson', 'B5'];

export const amountRandomCars = 100;

export const defaultColor = '#FEEA0B';

export const messageWinnerNotFound = 'All cars are broken';

export const maximumColorIntensity = 255;

export const startCoordinate = 70;
