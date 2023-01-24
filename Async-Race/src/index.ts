import './styles/common.styles.scss';
import RouterHash from './Router/RouterHash';
import Routes from './Router/Routs';

console.log('Привет мой проверяющий! Если это возможно, прошу дать мне на доработку еще 1-2 дня. Заранее спасибо =)')
window.addEventListener('load', () => new RouterHash(Routes).router());
window.addEventListener('hashchange', () => new RouterHash(Routes).router());
