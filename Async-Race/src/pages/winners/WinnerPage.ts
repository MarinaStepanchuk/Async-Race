import './WinnerPage.styles.scss';
import { body } from '../../constants/constants';
import Header from '../../containers/Header/Header';
import { ButtonNames } from '../../types/enums';
import { ClassMap } from '../../constants/htmlConstants';
import Element from '../../components/Element';
import WinnersPagination from '../../components/WinnersPagination/WinnersPagination';
import { IWinners } from '../../types/interfaces';
import Api from '../../api/Api';
import WinnersSubheader from '../../components/WinnersSubheader/WinnersSubheader';
import WinnerTables from '../../containers/WinnersTable/WinnersTable';

class WinnerPage {
  public render(): void {
    body.innerHTML = '';
    this.fill();
  }

  private async fill(): Promise<void> {
    const data = await this.getWinners();
    const countWinners = data ? Number(data?.countWinners) : 0;
    const winners = data ? data?.winners : [];
    const header = new Header(ButtonNames.winners).element;
    const main = new Element('main', [ClassMap.winnerdPage]).element;
    const sectionWinners = new Element('section', [ClassMap.winnersSection]).element;

    const subheader = new WinnersSubheader(countWinners).element;
    const pagination = new WinnersPagination().element;
    const winnersTable = new WinnerTables(winners).element;
    main.append(subheader, pagination, winnersTable);
    main.append(sectionWinners);
    body.append(header, main);
  }

  private async getWinners(): Promise<IWinners | null> {
    const api = new Api();
    const winners = await api.getWinners();
    return winners;
  }
}

export default WinnerPage;
