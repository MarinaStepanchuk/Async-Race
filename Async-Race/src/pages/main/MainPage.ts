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
    body.innerHTML = '';
    body.append(this.element);
    const section = new Element('section', [ClassMap.greeting]).element;
    this.element.append(section);
    const greetingContainer = new Element('div', [ClassMap.greetingContainer]).element;
    const title = new Element('h1', [ClassMap.greetingTitle], Content.greeting).element;
    const img = new Element('img', [ClassMap.greetingImg]).element as HTMLImageElement;
    img.src = car;
    const buttons = new Element('div', [ClassMap.greetingButtons]).element;
    section.append(greetingContainer, buttons);
    greetingContainer.append(title, img);
    buttons.append(new GarageButton().element, new WinnersButton().element);
  }
}

export default MainPage;
