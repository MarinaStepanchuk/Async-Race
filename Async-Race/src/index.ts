import './styles/common.styles.scss';
import RouterHash from './Router/RouterHash';
import Routes from './Router/Routs';

window.addEventListener('load', () => new RouterHash(Routes).router());
window.addEventListener('hashchange', () => new RouterHash(Routes).router());
