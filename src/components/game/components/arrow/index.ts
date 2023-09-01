import type { ArrowProps } from '../../../../interfaces/index';

const Arrow = ({ id, left, top, rotation, scale }: ArrowProps) => /*html*/ `<div
  id="${id}"
  style="transition: transform 140ms ease;position:absolute;transform:rotate(${rotation}deg);width:18px;left:${left}px;top:${top}px"
>
  <svg viewBox="0 0 85 470" style="transform:scaleY(${scale});">
    <polygon
      fill="#E6E9ED"
      points="85.32601928710938,127.98799896240234 51.201019287109375,149.33100128173828 33.516021728515625,149.33100128173828 0,127.98799896240234 0,21.334999084472656 85.32601928710938,21.334999084472656 "
    />
    <path
      fill="#FFCE54"
      d="m50.20101,3.117c-4.155,-4.156 -10.921,-4.156 -15.077,0c-2.093,2.094 -3.124,4.812 -3.124,7.547l0,0l0,394.283l21.326,0l0,-394.252c0.016,-2.734 -1.031,-5.484 -3.125,-7.578z"
    />
    <path
      fill="#ED5564"
      d="m55.37301,390.666c-4.484,0 -8.812,1.031 -12.718,2.984c-3.891,-1.953 -8.219,-2.984 -12.702,-2.984c-15.703,0 -28.469,12.766 -28.469,28.469c0,25.717 32.141,45.217 35.812,47.357l5.375,3.125l5.375,-3.125c3.655,-2.141 35.796,-21.641 35.796,-47.357c0,-15.688 -12.766,-28.469 -28.469,-28.469z"
    />
  </svg>
</div>`;

export default Arrow;
