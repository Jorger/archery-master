import type { Params } from '../interfaces/index';
import { Game } from '../components/index';

type HandlerType = {
  [key: string]: (params: Params) => void;
};

const Handler: HandlerType = { Game };

const Screen = (screen = 'Game', params = {}) => {
  Handler[screen](params);
};

export default Screen;
