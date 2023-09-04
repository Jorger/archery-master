import type { Params } from '../interfaces/index';
import { Game, Lobby } from '../components/index';

type HandlerType = {
  [key: string]: (params: Params) => void;
};

const Handler: HandlerType | any = { Game, Lobby };

const Screen = (screen: 'Lobby' | 'Game' = 'Lobby', params = {}) => {
  Handler[screen](params);
};

export default Screen;
