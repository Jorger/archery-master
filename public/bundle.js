(() => {
  'use strict';
  const t = 732,
    n = 412,
    o = 'container',
    e = document.querySelector.bind(document),
    a =
      (document.querySelectorAll.bind(document),
      (t, n, o) => (null == t ? void 0 : t.addEventListener(n, o))),
    l = (t, n) => {
      t && (t.innerHTML = n);
    },
    i = (t, n) => {
      if (t) for (const o in n) t.style[o] = n[o];
    },
    r = (t) => t.getBoundingClientRect(),
    s = () => {
      const { innerWidth: o, innerHeight: a } = window,
        l = Math.min(o / n, a / t),
        r = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      i(e('body'), {
        zoom: `${o < n ? Math.round((o / n) * 100) : 100}%`,
        transform: l >= 1 || r ? `scale(${r ? 1 : l})` : 'none'
      });
    },
    c = ({ id: t, left: n, top: o, rotation: e, scale: a }) =>
      `<div\n  id="${t}"\n  style="transition: transform 140ms ease;position:absolute;transform:rotate(${e}deg);width:18px;left:${n}px;top:${o}px"\n>\n  <svg viewBox="0 0 85 470" style="transform:scaleY(${a});">\n    <polygon\n      fill="#E6E9ED"\n      points="85.32601928710938,127.98799896240234 51.201019287109375,149.33100128173828 33.516021728515625,149.33100128173828 0,127.98799896240234 0,21.334999084472656 85.32601928710938,21.334999084472656 "\n    />\n    <path\n      fill="#FFCE54"\n      d="m50.20101,3.117c-4.155,-4.156 -10.921,-4.156 -15.077,0c-2.093,2.094 -3.124,4.812 -3.124,7.547l0,0l0,394.283l21.326,0l0,-394.252c0.016,-2.734 -1.031,-5.484 -3.125,-7.578z"\n    />\n    <path\n      fill="#ED5564"\n      d="m55.37301,390.666c-4.484,0 -8.812,1.031 -12.718,2.984c-3.891,-1.953 -8.219,-2.984 -12.702,-2.984c-15.703,0 -28.469,12.766 -28.469,28.469c0,25.717 32.141,45.217 35.812,47.357l5.375,3.125l5.375,-3.125c3.655,-2.141 35.796,-21.641 35.796,-47.357c0,-15.688 -12.766,-28.469 -28.469,-28.469z"\n    />\n  </svg>\n</div>`,
    d = ({ id: t, fill: n, left: o, top: e, rotation: a, scale: l }) =>
      `<div\n  id="${t}"\n  class="bow"\n  style="transform:rotate(${a}deg);left:${o}px;top:${e}px"\n>\n  <svg viewBox="0 0 190 491" style="transform:scaleX(${l});">\n    <rect x="12" fill="black" width="21" height="500"/>\n    <path\n      fill="${n}"\n      d="m170.75487,205.321c0,0 20.5,-29.858 19.406,-52.482c-4,-83.169 -107.668,-88.497 -159.557,-152.839l-30.515,0c-4.156,64.467 138.823,93.419 141.964,146.448c1.438,24.421 -13.984,53.857 -13.984,53.857l0,90.028c0,0 15.421,29.437 13.984,53.857c-3.141,53.029 -146.12,81.982 -141.964,146.449l30.515,0c51.889,-64.342 155.557,-69.67 159.557,-152.84c1.094,-22.623 -19.406,-52.482 -19.406,-52.482l0,-79.996z"\n    />\n  </svg>\n</div>`,
    p = [
      {
        w: 140,
        h: 245,
        p: [
          [54, 0],
          [36, 35],
          [71, 35],
          [18, 70],
          [53, 70],
          [88, 70],
          [0, 105],
          [35, 105],
          [70, 105],
          [105, 105],
          [18, 140],
          [53, 140],
          [88, 140],
          [36, 175],
          [71, 175],
          [54, 210]
        ]
      },
      {
        w: 105,
        h: 105,
        p: [
          [35, 0],
          [35, 35],
          [35, 70],
          [0, 35],
          [70, 35]
        ]
      },
      {
        w: 175,
        h: 175,
        a: !0,
        p: [
          [155, 68],
          [145, 108],
          [117, 140],
          [78, 154],
          [36, 149],
          [2, 126],
          [-17, 88],
          [-17, 47],
          [2, 9],
          [36, -14],
          [78, -19],
          [117, -5],
          [145, 27]
        ]
      },
      {
        w: 175,
        h: 175,
        p: [
          [70, 0],
          [35, 35],
          [105, 35],
          [0, 70],
          [70, 70],
          [140, 70],
          [35, 105],
          [105, 105],
          [70, 140]
        ]
      },
      {
        w: 140,
        h: 140,
        a: !0,
        p: [
          [0, 0],
          [35, 0],
          [70, 0],
          [105, 0],
          [0, 35],
          [105, 35],
          [0, 70],
          [105, 70],
          [0, 105],
          [35, 105],
          [70, 105],
          [105, 105]
        ]
      },
      {
        w: 35,
        h: 105,
        p: [
          [0, 0],
          [0, 35],
          [0, 70]
        ]
      },
      {
        w: 175,
        h: 175,
        a: !0,
        p: [
          [0, 70],
          [35, 70],
          [70, 70],
          [105, 70],
          [140, 70],
          [70, 0],
          [70, 35],
          [70, 105],
          [70, 140]
        ]
      },
      {
        w: 105,
        h: 105,
        p: [
          [35, 35],
          [0, 35],
          [70, 35],
          [35, 0],
          [35, 70]
        ]
      }
    ],
    h = (t = 0) => {
      const { w: n, h: o, p: e, a = !1 } = p[t];
      return `<div class="targets" style="width:${n}px;height:${o}px;">\n  ${e
        .map(([t, n], o) =>
          ((t = '', n = 0, o = 0) =>
            `<div class="target" id=${t} style="left:${n}px;top:${o}px"></div>`)(
            `t-${o}`,
            t,
            n
          )
        )
        .join('')}\n  </div>`;
    };
  let f = !1;
  const m = [
      { animate: !1, angle: 0, point: { x: 0, y: 0 } },
      { animate: !1, angle: 0, point: { x: 0, y: 0 } }
    ],
    w = [
      {
        bow: { fill: '#de8f6f', left: 176, top: 542, rotation: 270, scale: 1 },
        arrow: { left: 195, top: 572, rotation: 0, scale: -1 }
      },
      {
        bow: { fill: '#3c7cab', left: 176, top: 40, rotation: 270, scale: -1 },
        arrow: { left: 195, top: 75, rotation: 0, scale: 1 }
      }
    ],
    u = (t, n) => {
      const o = r(n),
        e = r(t);
      return {
        top: Math.round(o.top - e.top),
        left: Math.round(o.left - e.left)
      };
    },
    v = (t = 0) => {
      let n = t % 360;
      return n < 0 && (n += 360), Math.round(Math.abs(n));
    },
    $ = (t, n) => (180 * Math.atan2(t.y - n.y, t.x - n.x)) / Math.PI,
    g = (t) => {
      const { left: n, top: o } = r(e('#control'));
      let a = 0,
        l = 0;
      t instanceof MouseEvent
        ? ((a = t.clientX), (l = t.clientY))
        : t instanceof TouchEvent &&
          ((a = t.touches[0].clientX), (l = t.touches[0].clientY));
      return { x: Math.round(a - n), y: Math.round(l - o) };
    },
    x = (t) => {
      const n = e('#bow-1'),
        { left: o, top: a } = u(e('#control'), n),
        { width: l } = r(n),
        s = { x: Math.round(o + l / 2), y: a },
        c = $(s, t),
        d = v(c);
      if (d >= 180 && d <= 360) {
        i(n, { transform: `rotate(${d}deg)` });
        const t = d - 270;
        (m[0].angle = t), i(e('#arrow-1'), { transform: `rotate(${t}deg)` });
      }
    };
  const y = (t = 1) => {
      const { left: n, top: o } = w[t - 1].arrow;
      (m[t - 1].point = { x: n, y: o }),
        (m[t - 1].animate = !0),
        (m[t - 1].interval = setInterval(
          () =>
            ((t = 1) => {
              const n = e(`#arrow-${t}`),
                { angle: o, point: a } = m[t - 1],
                l = (o - 90) * (Math.PI / 180),
                r = a.x + 10 * Math.cos(l),
                s = a.y + 10 * Math.sin(l);
              if (
                ((m[t - 1].point = { x: r, y: s }),
                i(n, { left: `${r}px`, top: `${s}px` }),
                s < -100 || r < -50 || s > 832 || r > 462)
              ) {
                console.log('TERMINA'),
                  (m[t - 1].animate = !1),
                  clearInterval(m[t - 1].interval);
                const { left: o, top: e } = w[t - 1].arrow;
                i(n, { left: `${o}px`, top: `${e}px` });
              }
            })(t),
          1
        ));
    },
    M = (t) => {
      f || m[0].animate || (x(g(t)), (f = !0), console.log('handleMouseDown'));
    },
    b = () => {
      f && !m[0].animate && (y(), console.log('handleMouseUp'), (f = !1));
    },
    E = (t) => {
      f && !m[0].animate && x(g(t));
    },
    j = {
      Game: () => {
        const t = `<div class="game wh jc">\n    ${w
          .map(
            (t, n) =>
              `${d(Object.assign({ id: `bow-${n + 1}` }, t.bow))}${c(
                Object.assign({ id: `arrow-${n + 1}` }, t.arrow)
              )}\n      `
          )
          .join('')}\n    <div id="r-target">${h(
          2
        )}</div>\n    <div id="control"></div>\n  </div>`;
        l(e(`#${o}`), t),
          (() => {
            [
              ['mousedown', M],
              ['mouseup', b],
              ['mousemove', E],
              ['touchstart', M],
              ['touchend', b],
              ['touchmove', E],
              ['mouseleave', b]
            ].forEach((t) => a(e('#control'), t[0], t[1]));
            const t = { x: w[1].bow.left, y: w[1].bow.top },
              { left: n, top: o } = u(e('.game'), e('#t-6'));
            console.log('ANGULO ES: ', v($(t, { x: n, y: o })));
          })();
      }
    },
    z = (t = 'Game', n = {}) => {
      j[t](n);
    };
  l(
    e('#root'),
    `<div\n    id="${o}"\n    style="overflow: hidden;width:412px;height:732px"\n  ></div>`
  ),
    a(document, 'contextmenu', (t) => t.preventDefault()),
    a(window, 'resize', s),
    s(),
    z('Game');
})();
