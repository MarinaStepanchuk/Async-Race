import { body } from '../../constants/constants';
import Element from '../../components/Element';
import './MainPage.styles.scss';
import GarageButton from '../../components/GarageButton/GarageButton';
import WinnersButton from '../../components/WinnersButton/WinnersButton';
import { ClassMap, Content } from '../../constants/htmlConstants';
import car from '../../assets/img/car.gif';

class MainPage extends Element {
  constructor() {
    super('main', [ClassMap.mainPage]);
  }

  public render(): void {
    const title = new Element('h1', [ClassMap.greetingTitle], Content.greeting).element;
    const img = new Element('img', [ClassMap.greetingImg]).element as HTMLImageElement;
    img.src = car;

    const greetingContainer = new Element('div', [ClassMap.greetingContainer]).element;
    greetingContainer.append(title, img);

    const buttons = new Element('div', [ClassMap.greetingButtons]).element;
    buttons.append(new GarageButton().element, new WinnersButton().element);

    const section = new Element('section', [ClassMap.greeting]).element;
    section.append(greetingContainer, buttons);
    this.element.append(section);

    body.replaceChildren(this.element);
  }
}

export default MainPage;
