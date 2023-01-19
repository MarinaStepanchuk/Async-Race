import { body } from '../../constants/constants';

class GaragePage {
  public static render(): void {
    // for test
    body.innerHTML = '';
    const div = document.createElement('div');
    div.innerText = 'Garage page';
    const linkWinners = document.createElement('a');
    div.append(linkWinners);
    linkWinners.innerHTML = 'winners';
    linkWinners.href = '#/winners';
    body.append(div);
  }
}

export default GaragePage;
