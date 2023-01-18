import GaragePage from '../pages/garage/GaragePage';
import MainPage from '../pages/main/MainPage';
import WinnerPage from '../pages/winners/WinnerPage';

const Routes = {
  '/': MainPage.render,
  '/garage': GaragePage.render,
  '/winners': WinnerPage.render,
};

export default Routes;
