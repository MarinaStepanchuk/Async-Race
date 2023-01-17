import { body } from '../../constants/constants';

class MainPage {
  public render(): void {
    // for test
    body.innerHTML = '';
    const div = document.createElement('div');
    div.innerText = 'Main page';
    const linkWinners = document.createElement('a');
    div.append(linkWinners);
    linkWinners.innerHTML = 'winners';
    linkWinners.href = '#/winners';
    const linkGarage = document.createElement('a');
    div.append(linkGarage);
    linkGarage.innerHTML = 'garage';
    linkGarage.href = '#/garage';
    body.append(div);
  }
}

export default MainPage;
