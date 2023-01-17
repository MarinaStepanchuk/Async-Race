import GaragePage from '../pages/garage/GaragePage';
import MainPage from '../pages/main/MainPage';
import WinnerPage from '../pages/winners/WinnerPage';

const Routes = {
  '/': new MainPage().render,
  '/garage': new GaragePage().render,
  '/winners': new WinnerPage().render,
};

export default Routes;
