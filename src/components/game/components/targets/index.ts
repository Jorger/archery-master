import './styles.css';
import { $ } from '../../../../utils/helpers';
import { randomNumber } from '../../../../utils/helpers';
import { TYPES } from './helpers';

const Target = (id = '', left = 0, top = 0) =>
  /*html*/ `<div class="target" id=${id} style="left:${left}px;top:${top}px"></div>`;

const SpecialTarget =
  () => /*html*/ `<div class="targets" style="width:105px;height:210px;">
  ${new Array(6)
    .fill(null)
    .map(
      (_, index) => /*html*/ `<div class="target-spe ${
        index % 2 === 0 ? 'left' : 'right'
      }" style="top:${35 * index}px">
      ${new Array(3)
        .fill(null)
        .map((_, key) => Target(`t-${key + index * 3}`, 35 * key, 0))
        .join('')}
      </div>`
    )
    .join('')}
  </div>`;

const Targets = (type = 0) => {
  if (type >= TYPES.length) {
    return SpecialTarget();
  }

  const { w, h, p, a = false } = TYPES[type];
  const animate = a || randomNumber(0, 1) === 1;
  let vars = '';

  if (animate) {
    const deg = randomNumber(0, 1);
    vars = `--s:${randomNumber(2, 5)}s;--i:${deg ? '0' : '359'}deg;--f:${
      deg ? '359' : '0'
    }deg;`;
  }

  $('html' as any).style.cssText = vars;

  return /*html*/ `<div class="targets${
    animate ? ' a' : ''
  }" style="width:${w}px;height:${h}px;">
  ${p.map(([x, y], i) => Target(`t-${i}`, x, y)).join('')}
  </div>`;
};

export default Targets;
