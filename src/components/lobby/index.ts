import { CONTAINER } from '../../utils/constants';
import { $, $$, $on, setHtml } from '../../utils/helpers';
import Screen from '../../screens/index';

const Lobby = () => {
  const render = /*html*/ `<div class="lobby wh jc">
    <div>
      <button>Easy</button>
      <button>Medium</button>
      <button>Hard</button>
    </div>`;

  setHtml($(`#${CONTAINER}`), render);
  [...$$('.lobby button')].forEach((button, index) => {
    $on(button as HTMLElement, 'click', () => {
      Screen('Game', { dificulty: index + 1 });
    });
  });
};

export default Lobby;
