import { body } from '../../constants/constants';

class ErrorPage {
  public static render(): void {
    // for test
    body.innerHTML = '';
    const div = document.createElement('div');
    div.innerText = 'Error page';
    body.append(div);
  }
}

export default ErrorPage;
