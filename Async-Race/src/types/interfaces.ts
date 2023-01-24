export interface ICar {
  name: string,
  color: string,
  id: number
}

export interface ICars {
  cars: ICar[],
  countCars: string | null
}

export interface IWinner {
  id: number,
  wins: number,
  time: number
}

export interface IWinners {
  winners: IWinner[],
  countWinners: string | null
}

export interface IOptionsElement {
  tag: keyof HTMLElementTagNameMap,
  classList?: string[],
  content?: string,
  id?: string,
}

export interface IChallenger {
  id: number,
  success: boolean,
  time: number,
}
