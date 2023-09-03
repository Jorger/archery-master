import './styles.css';
import { $, setHtml } from '../../utils/helpers';
import { Arrow, Bow, Case } from './components/index';
import { CONTAINER } from '../../utils/constants';
import { DATA_BOW_ARROW, addEvents } from './helpers';
// Targets
// <div id="r-target">${Targets(0)}</div>
// <div id="pivot"></div>
// <div class="lock-ui wh jc"></div>

// <span>RED WIN</span> b r

const Game = () => {
  const data =
    /*html*/
    `<div class="game wh jc">
      <div class="lock-ui wh jc"></div>
      <div class="win-ui hide wh jc"></div>
      ${DATA_BOW_ARROW.map(
        (v, i) =>
          `${Bow({ id: `bow-${i + 1}`, ...v.bow })}
          ${Arrow({
            id: `arrow-${i + 1}`,
            ...v.arrow
          })}
          ${Case({ index: i + 1, type: i === 0 ? 'bottom' : 'top' })}
        `
      ).join('')}
      <div class="score jc"></div>
      <button id="exit">EXIT</button>
      <div id="r-target"></div>
      <div id="control"></div>
  </div>`;

  setHtml($(`#${CONTAINER}`), data);
  addEvents();

  // <button id=btn style="position: absolute;top: 30px;left: 30px;font-size: 30px;">Test</button>
  // $on($('#btn') as HTMLElement, 'click', () => {
  //   setHtml($('#r-target'), Targets(randomNumber(0, 7)));
  // });
};

export default Game;
