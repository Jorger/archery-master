import './styles.css';
import { $, $on, setHtml } from './utils/helpers';
import { CONTAINER, HEIGHT, ROOT, WIDTH } from './utils/constants';
import { PlaySound } from './utils/sounds';
import Screen from './screens/index';

setHtml(
  $(`#${ROOT}`),
  /*html*/ `<div
    id="${CONTAINER}"
    style="overflow: hidden;width:${WIDTH}px;height:${HEIGHT}px"
  ></div>`
);

$on(document as any, 'contextmenu', (event) => event.preventDefault());

const onClickEvent = (e: MouseEvent) => {
  const target = e.target as Element;
  if (target && ['a', 'button'].includes(target.tagName.toLowerCase())) {
    PlaySound('click');
  }
};

$on(window as any, 'click', onClickEvent);
Screen('Lobby');

console.log(
  '%cGame developed by Jorge Rubiano.',
  'color:red; font-size:20px; font-weight: bold; -webkit-text-stroke: 1px black; border-radius:10px; padding: 20px; background-color: black;'
);
