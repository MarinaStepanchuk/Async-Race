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

class WinnerPage {
  public apiService;

  private header: HTMLElement;

  private main: HTMLElement;

  constructor() {
    this.apiService = new Api();
    this.header = new Header(ButtonNames.WINNERS).element;
    this.main = new Element('main', [ClassMap.winners.winnerdPage]).element;
  }

  public render(): void {
    body.replaceChildren(this.header, this.main);
    this.fill();
  }

  private async fill(): Promise<void> {
    const data = await this.apiService.getWinners();
    const countWinners = data ? Number(data?.countWinners) : 0;
    const winners = data ? data?.winners : [];
    const subheader = new WinnersSubheader(countWinners).element;
    const pagination = new WinnersPagination().element;
    const winnersTable = new WinnerTables(winners).element;
    this.main.append(subheader, pagination, winnersTable);
  }
}

export default WinnerPage;
