import { body } from '../../constants/constants';
import Header from '../../containers/Header/Header';
import { ButtonNames } from '../../types/enums';

class WinnerPage {
  public static render(): void {
    body.innerHTML = '';
    const header = new Header(ButtonNames.winners).element;
    body.append(header);
  }
}

export default WinnerPage;
