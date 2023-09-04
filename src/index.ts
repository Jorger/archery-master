import './styles.css';
import { $, $on, setHtml } from './utils/helpers';
import { CONTAINER, HEIGHT, ROOT, WIDTH } from './utils/constants';
import Screen from './screens/index';

setHtml(
  $(`#${ROOT}`),
  /*html*/ `<div
    id="${CONTAINER}"
    style="overflow: hidden;width:${WIDTH}px;height:${HEIGHT}px"
  ></div>`
);

$on(document as any, 'contextmenu', (event) => event.preventDefault());

// $on(window as any, 'resize', onWindowResize);
// onWindowResize();

// Screen('Game', { dificulty: 1 });
Screen('Lobby');
