import './styles.css';
import { $, setHtml } from '../../utils/helpers';
import { Arrow, Bow, Case } from './components/index';
import { CONTAINER } from '../../utils/constants';
import { DATA_BOW_ARROW, addEvents } from './helpers';

const Game = ({ dificulty = 1 }: { dificulty: number }) => {
  const render =
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

  setHtml($(`#${CONTAINER}`), render);
  addEvents(dificulty);
};

export default Game;
