export enum ErrorMessages {
  WRONG_PARAMETERS = 'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
  NOT_FOUND_CAR = 'Car with such id was not found in the garage.',
  NOT_FOUND_CAR_TO_START = 'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
  DRIVE_IN_PROGRESS = 'Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.',
  TURNED_ENGINE = 'Car has been stopped suddenly. It\'s engine was broken down.',
  UNKNOWN = 'Unknown error',
  DUPLICATE_ID = 'Insert failed, duplicate id',
}

export enum ErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponceStatus {
  OK = 200,
}
