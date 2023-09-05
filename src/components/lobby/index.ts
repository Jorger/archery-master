import './styles.css';
import { $, $$, $on, setHtml } from '../../utils/helpers';
import { COLORS, CONTAINER } from '../../utils/constants';
import Person from '../person/index';
import Screen from '../../screens/index';

const Lobby = () => {
  const render = /*html*/ `<div class="lobby wh">
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
      ${Person({ color: COLORS[0], score: 0 })}
      ${Person({ color: COLORS[1], score: 0 })}
    </div>
  </div>`;

  setHtml($(`#${CONTAINER}`), render);

  [...$$('.lobby button')].forEach((button, index) => {
    $on(button as HTMLElement, 'click', () => {
      Screen('Game', { dificulty: index + 1 });
    });
  });

  console.log('HARÍA UNA ACCIÓN');
};

export default Lobby;
