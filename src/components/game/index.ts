import './styles.css';
import { $, html, setHtml } from '../../utils/helpers';
import { CONTAINER } from '../../utils/constants';
import Bow from './components/bow';
import Arrow from './components/arrow';

const Game = () => {
  const data = html`<div class="game wh">${Bow()}${Arrow()}</div>`;

  setHtml($(`#${CONTAINER}`), data);
};

export default Game;
