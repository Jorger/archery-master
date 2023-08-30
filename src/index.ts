import './styles.css';
import { $, $on, html, onWindowResize, setHtml } from './utils/helpers';
import { ROOT, CONTAINER, HEIGHT, WIDTH } from './utils/constants';
import Screen from './screens/index';

setHtml(
  $(`#${ROOT}`),
  html`<div
    id="${CONTAINER}"
    style="width:${WIDTH}px;height:${HEIGHT}px"
  ></div>`
);

$on(document as any, 'contextmenu', (event) => event.preventDefault());

$on(window as any, 'resize', onWindowResize);
onWindowResize();

Screen('Game');
