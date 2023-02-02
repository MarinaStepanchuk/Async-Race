import ErrorPage from '../pages/error/ErrorPage';
import { RoutesType } from '../types/types';

class RouterHash {
  constructor(private readonly routes: RoutesType) {
  }

  public router(): void {
    const [,pageRoute] = window.location.hash.split('/');
    const url: string = pageRoute ? `/${pageRoute}` : '/';
    const cb = this.routes[url];
    if (cb) {
      cb();
    } else {
      new ErrorPage().render();
    }
  }
}

export default RouterHash;
