import ErrorPage from '../pages/error/ErrorPage';
import { RoutesType } from '../types/types';

class RouterHash {
  constructor(private readonly routes: RoutesType) {
    this.routes = routes;
  }

  public router(): void {
    const urlParts = window.location.hash.split('/');
    const url: string = urlParts[1] ? `/${urlParts[1]}` : '/';
    const cb = this.routes[url];
    if (cb) {
      cb();
    } else {
      new ErrorPage().render();
    }
  }
}

export default RouterHash;
