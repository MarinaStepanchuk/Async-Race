import './WinnerPage.styles.scss';
import { body } from '../../constants/constants';
import Header from '../../containers/Header/Header';
import { ButtonNames } from '../../types/enums';
import { ClassMap } from '../../constants/htmlConstants';
import Element from '../../components/Element';
import WinnersPagination from '../../components/WinnersPagination/WinnersPagination';

import Api from '../../api/Api';
import WinnersSubheader from '../../components/WinnersSubheader/WinnersSubheader';
import WinnerTables from '../../containers/WinnersTable/WinnersTable';

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
    const header = new Header(ButtonNames.winners).element;
    const main = new Element('main', [ClassMap.winners.winnerdPage]).element;
    const sectionWinners = new Element('section', [ClassMap.winners.winnersSection]).element;

    const subheader = new WinnersSubheader(countWinners).element;
    const pagination = new WinnersPagination().element;
    const winnersTable = new WinnerTables(winners).element;
    main.append(subheader, pagination, winnersTable);
    main.append(sectionWinners);
    body.append(header, main);
  }
}

export default WinnerPage;
