import './styles.css';
import { $, $on, randomNumber, setHtml } from '../../utils/helpers';
import { Arrow, Bow, Targets } from './components/index';
import { CONTAINER } from '../../utils/constants';
import { addEvents, DATA_BOW_ARROW } from './helpers';
// Targets
// <div id="r-target">${Targets(0)}</div>
// <div id="pivot"></div>

const Game = () => {
  const data = /*html*/ `<div class="game wh jc">
    ${DATA_BOW_ARROW.map(
      (v, i) =>
        `${Bow({ id: `bow-${i + 1}`, ...v.bow })}${Arrow({
          id: `arrow-${i + 1}`,
          ...v.arrow
        })}
      `
    ).join('')}
    <div id="r-target"></div>
    <div id="control"></div>
    <button id=btn style="position: absolute;top: 30px;left: 30px;font-size: 30px;">Test</button>
  </div>`;

  setHtml($(`#${CONTAINER}`), data);
  addEvents();

  setHtml($('#r-target'), Targets(randomNumber(0, 7)));

  $on($('#btn') as HTMLElement, 'click', () => {
    setHtml($('#r-target'), Targets(randomNumber(0, 7)));
  });
};

export default Game;
