import { body } from '../../constants/constants';
import Element from '../../components/Element';
import './ErrorPage.styles.scss';
import { ClassMap, Content } from '../../constants/htmlConstants';

class ErrorPage extends Element {
  constructor() {
    super('main', [ClassMap.errorPage]);
  }

  public render(): void {
    const errorMessage = new Element('div', [ClassMap.errorMessage], Content.errorMessage).element;
    this.element.append(errorMessage);
    body.replaceChildren(this.element);
  }
}

export default ErrorPage;
