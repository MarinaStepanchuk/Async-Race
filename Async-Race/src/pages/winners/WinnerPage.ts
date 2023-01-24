import './WinnerPage.styles.scss';
import { body } from '../../constants/constants';
import Header from '../../containers/Header/Header';
import { ButtonNames } from '../../types/enums';
import { ClassMap } from '../../constants/htmlConstants';
import Element from '../../components/Element';
// eslint-disable-next-line import/no-cycle
import WinnersPagination from '../../components/WinnersPagination/WinnersPagination';

import Api from '../../api/Api';
import WinnersSubheader from '../../components/WinnersSubheader/WinnersSubheader';
import WinnerTables from '../../containers/WinnersTable/WinnersTable';
import { getElement } from '../../utils/getElement';
import { State } from '../../constants/state';

class WinnerPage {
  public apiService = new Api();

  public render(): void {
    body.innerHTML = '';
    this.fill();
  }

  private async fill(): Promise<void> {
    const data = await this.apiService.getWinners();
    const countWinners = data ? Number(data?.countWinners) : 0;
    const winners = data ? data?.winners : [];
    const header = new Header(ButtonNames.WINNERS).element;
    const main = new Element('main', [ClassMap.winners.winnerdPage]).element;
    const subheader = new WinnersSubheader(countWinners).element;
    const pagination = new WinnersPagination().element;
    const winnersTable = new WinnerTables(winners).element;
    main.append(subheader, pagination, winnersTable);
    body.append(header, main);
  }
}

export default WinnerPage;
