(()=>{"use strict";const e=412,i="container",t=document.querySelector.bind(document),n=(document.querySelectorAll.bind(document),String.raw),d=(e,i,t)=>null==e?void 0:e.addEventListener(i,t),o=(e,i)=>{e&&(e.innerHTML=i)},c=()=>{const{innerWidth:i,innerHeight:n}=window,d=Math.min(i/e,n/732),o=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);((e,i)=>{if(e)for(const t in i)e.style[t]=i[t]})(t("body"),{zoom:`${i<e?Math.round(i/e*100):100}%`,transform:d>=1||o?`scale(${o?1:d})`:"none"})},l=()=>n`<div style="width:60px;">
  <svg viewBox="0 0 190 491">
    <path
      fill="#A85D5D"
      d="m170.75487,205.321c0,0 20.5,-29.858 19.406,-52.482c-4,-83.169 -107.668,-88.497 -159.557,-152.839l-30.515,0c-4.156,64.467 138.823,93.419 141.964,146.448c1.438,24.421 -13.984,53.857 -13.984,53.857l0,90.028c0,0 15.421,29.437 13.984,53.857c-3.141,53.029 -146.12,81.982 -141.964,146.449l30.515,0c51.889,-64.342 155.557,-69.67 159.557,-152.84c1.094,-22.623 -19.406,-52.482 -19.406,-52.482l0,-79.996z"
    />
  </svg>
</div>`,s=()=>n`<div style="width:25px;">
  <svg viewBox="0 0 85 470">
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
</div>`,r={Game:()=>{const e=n`<div class="game wh">${l()}${s()}</div>`;o(t(`#${i}`),e)}},a=(e="Game",i={})=>{r[e](i)};o(t("#root"),n`<div
    id="${i}"
    style="width:${e}px;height:${732}px"
  ></div>`),d(document,"contextmenu",(e=>e.preventDefault())),d(window,"resize",c),c(),a("Game")})();