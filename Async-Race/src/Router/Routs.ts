import GaragePage from '../pages/garage/GaragePage';
import MainPage from '../pages/main/MainPage';
import WinnerPage from '../pages/winners/WinnerPage';

const Routes = {
  '/': (): void => new MainPage().render(),
  '/garage': ():void => new GaragePage().render(),
  '/winners': ():void => new WinnerPage().render(),
};

export default Routes;
