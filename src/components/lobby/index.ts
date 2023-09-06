import './styles.css';
import { $, $$, $on, setHtml } from '../../utils/helpers';
import { COLORS, CONTAINER } from '../../utils/constants';
import { isSoundsEnabled, toogleSounds } from '../../utils/sounds';
import Person from '../person/index';
import Screen from '../../screens/index';
import { getValueFromCache } from '../../utils/storage';

const Lobby = () => {
  const render = /*html*/ `<div class="lobby wh">
  <button class="lobby-so jc">${isSoundsEnabled() ? '🔈' : '🔇'}</button>
  <a title="Jorge Rubiano" href="https://bio.link/jorgerub" target="_blank" rel="noopener noreferrer" class="lobby-ab jc">👨🏻‍💻</a>
  <h1>ARCHERY MASTER</h1>
  <div class="lobby-btn jc">
      <p>
        Load your bow and hit 70 targets before your opponent!
      </p>
      <div class="jc">
        <button>EASY</button>
        <button>MEDIUM</button>
        <button>HARD</button>
      </div>
    </div>
    <div class="lobby-pe">
      ${Person({ color: COLORS[0], score: 0, type: 'red' })}
      ${Person({ color: COLORS[1], score: 0, type: 'blue' })}
    </div>
    <a href="https://js13kgames.com/" target="_blank" rel="noopener noreferrer" class="lobby-co">JS13k - 2023</a>
  </div>`;

  setHtml($(`#${CONTAINER}`), render);

  [...$$('.lobby-btn button')].forEach((button, index) => {
    $on(button as HTMLElement, 'click', () => {
      Screen('Game', { dificulty: index + 1 });
    });
  });

  $on($('.lobby-so') as HTMLElement, 'click', () => {
    toogleSounds($('.lobby-so') as HTMLElement);
  });

  const getTotalScore = getValueFromCache('score', { red: 0, blue: 0 });
  setHtml($('#sc-red'), getTotalScore.red);
  setHtml($('#sc-blue'), getTotalScore.blue);
};

export default Lobby;
