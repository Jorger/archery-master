import './styles.css';
import { $, setHtml } from '../../utils/helpers';
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
    <div id="r-target">${Targets(0)}</div>
    <div id="control"></div>
  </div>`;

  setHtml($(`#${CONTAINER}`), data);
  addEvents();
};

export default Game;
