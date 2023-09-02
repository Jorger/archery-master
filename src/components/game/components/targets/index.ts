import './styles.css';
import { $ } from '../../../../utils/helpers';
import { randomNumber } from '../../../../utils/helpers';
import { TYPES } from './helpers';

/*
Tipo 1:
140x245
${Target('t-1', 54, 0)}
${Target('t-1', 36, 35)}
${Target('t-1', 71, 35)}
${Target('t-1', 18, 70)}
${Target('t-1', 53, 70)}
${Target('t-1', 88, 70)}
${Target('t-1', 0, 105)}
${Target('t-1', 35, 105)}
${Target('t-1', 70, 105)}
${Target('t-1', 105, 105)}
${Target('t-1', 18, 140)}
${Target('t-1', 53, 140)}
${Target('t-1', 88, 140)}
${Target('t-1', 36, 175)}
${Target('t-1', 71, 175)}
${Target('t-1', 54, 210)}


Tipo 2:
105x105
${Target('t-1', 35, 0)}
${Target('t-1', 35, 35)}
${Target('t-1', 35, 70)}
${Target('t-1', 0, 35)}
${Target('t-1', 70, 35)}


Tipe 03:
175x175
${Target('t-1', 155, 68)}
${Target('t-1', 145, 108)}
${Target('t-1', 117, 140)}
${Target('t-1', 78, 154)}
${Target('t-1', 36, 149)}
${Target('t-1', 2, 126)}
${Target('t-1', -17, 88)}
${Target('t-1', -17, 47)}
${Target('t-1', 2, 9)}
${Target('t-1', 36, -14)}
${Target('t-1', 78, -19)}
${Target('t-1', 117, -5)}
${Target('t-1', 145, 27)}

Tipe 04:
175x175
${Target('t-1', 70, 0)}
${Target('t-1', 35, 35)}
${Target('t-1', 105, 35)}
${Target('t-1', 0, 70)}
${Target('t-1', 70, 70)}
${Target('t-1', 140, 70)}
${Target('t-1', 35, 105)}
${Target('t-1', 105, 105)}
${Target('t-1', 70, 140)}

Type 05:
140x140
${Target('t-1', 0, 0)}
${Target('t-1', 35, 0)}
${Target('t-1', 70, 0)}
${Target('t-1', 105, 0)}
${Target('t-1', 0, 35)}
${Target('t-1', 105, 35)}
${Target('t-1', 0, 70)}
${Target('t-1', 105, 70)}
${Target('t-1', 0, 105)}
${Target('t-1', 35, 105)}
${Target('t-1', 70, 105)}
${Target('t-1', 105, 105)}

type 06:
35x105
${Target('t-1', 0, 0)}
${Target('t-1', 0, 35)}
${Target('t-1', 0, 70)}

type 07:
175x175
${Target('t-1', 0, 70)}
${Target('t-1', 35, 70)}
${Target('t-1', 70, 70)}
${Target('t-1', 105, 70)}
${Target('t-1', 140, 70)}
${Target('t-1', 70, 0)}
${Target('t-1', 70, 35)}
${Target('t-1', 70, 105)}
${Target('t-1', 70, 140)}

type 08:
105x105
${Target('t-1', 35, 35)}
${Target('t-1', 0, 35)}
${Target('t-1', 70, 35)}
${Target('t-1', 35, 0)}
${Target('t-1', 35, 70)}
*/

// const TYPES = [{

// }];

// const distribution
// ${id}
const Target = (id = '', left = 0, top = 0) =>
  /*html*/ `<div class="target" id=${id} style="left:${left}px;top:${top}px"></div>`;

const Targets = (type = 0) => {
  const { w, h, p, a = false } = TYPES[type];
  let vars = '';

  if (a) {
    const deg = randomNumber(0, 1);
    vars = `--s:${randomNumber(3, 5)}s;--i:${deg ? '0' : '359'}deg;--f:${
      deg ? '359' : '0'
    }deg;`;
  }

  $('html' as any).style.cssText = vars;

  return /*html*/ `<div class="targets${
    a ? ' a' : ''
  }" style="width:${w}px;height:${h}px;">
  ${p.map(([x, y], i) => Target(`t-${i}`, x, y)).join('')}
  </div>`;
};

export default Targets;
