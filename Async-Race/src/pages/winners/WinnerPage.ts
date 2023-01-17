import { body } from '../../constants/constants';

class WinnerPage {
  public render(): void {
    // for test
    body.innerHTML = '';
    const div = document.createElement('div');
    div.innerText = 'Winner page';
    const linkGarage = document.createElement('a');
    div.append(linkGarage);
    linkGarage.innerHTML = 'garage';
    linkGarage.href = '#/garage';
    body.append(div);
  }
}

export default WinnerPage;
