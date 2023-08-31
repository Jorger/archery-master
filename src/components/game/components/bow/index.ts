import './styles.css';
import type { BowProps } from '../../../../interfaces/index';

// border:1px solid ${fill}
const Bow = ({
  id,
  fill,
  left,
  top,
  rotation,
  scale
}: BowProps) => /*html*/ `<div
  id="${id}"
  class="bow"
  style="transform:rotate(${rotation}deg);left:${left}px;top:${top}px"
>
  <svg viewBox="0 0 190 491" style="transform:scaleX(${scale});">
    <rect x="12" fill="black" width="21" height="500"/>
    <path
      fill="${fill}"
      d="m170.75487,205.321c0,0 20.5,-29.858 19.406,-52.482c-4,-83.169 -107.668,-88.497 -159.557,-152.839l-30.515,0c-4.156,64.467 138.823,93.419 141.964,146.448c1.438,24.421 -13.984,53.857 -13.984,53.857l0,90.028c0,0 15.421,29.437 13.984,53.857c-3.141,53.029 -146.12,81.982 -141.964,146.449l30.515,0c51.889,-64.342 155.557,-69.67 159.557,-152.84c1.094,-22.623 -19.406,-52.482 -19.406,-52.482l0,-79.996z"
    />
  </svg>
</div>`;

export default Bow;
