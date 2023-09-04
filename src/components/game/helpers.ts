import {
  $,
  $$,
  $on,
  addStyle,
  classList,
  getDOMRect,
  hasClass,
  randomNumber,
  setHtml
} from '../../utils/helpers';
import { HEIGHT, WIDTH } from '../../utils/constants';
import { Targets } from './components/index';
import type { BowProps, ArrowProps, Coordinate } from '../../interfaces/index';
import { TYPES } from './components/targets/helpers';

let IS_MOUSE_DOWN = false;
// Para guardar el intervalo de segimiento del arco del bot a su target...
let BOW_INTERVAL_FOLLOW_TARGET: NodeJS.Timeout;
// Para la clase que oculta los targets...
const HIDE_TARGET_CLASS = 'hide';
// La puntuación máxima...
const MAX_SCORE = 70;
// Para saber si es gameOver
let IS_GAME_OVER = false;

const ANIMATION: {
  animate: boolean;
  interval?: NodeJS.Timeout;
  angle: number;
  score: number;
  arrows: number;
  hasArrow: boolean;
  point: Coordinate;
}[] = [
  {
    animate: false,
    angle: 0,
    point: { x: 0, y: 0 },
    score: 0,
    arrows: 0,
    hasArrow: true
  },
  {
    animate: false,
    angle: 0,
    point: { x: 0, y: 0 },
    score: 0,
    arrows: 0,
    hasArrow: true
  }
];
// let INITIAL_POINT_CLICK: Coordinate = { x: 0, y: 0 };

export const DATA_BOW_ARROW: {
  bow: BowProps;
  arrow: ArrowProps;
}[] = [
  {
    bow: {
      fill: '#de8f6f',
      left: 176,
      top: HEIGHT - 190,
      rotation: 270,
      scale: 1
    },
    arrow: {
      left: 195,
      top: HEIGHT - 160,
      rotation: 0,
      scale: -1
    }
  },
  {
    bow: {
      fill: '#3c7cab',
      left: 176,
      top: 40,
      rotation: 270,
      scale: -1
    },
    arrow: {
      left: 195,
      top: 75,
      rotation: 0,
      scale: 1
    }
  }
];

// const movePointAtAngle = (
//   point: Coordinate,
//   angle: number,
//   distance: number
// ): Coordinate => ({
//   x: point.x + Math.sin(angle) * distance,
//   y: point.y - Math.cos(angle) * distance
// });

const getPositionRelativeToParent = (
  parentElement: HTMLElement,
  childElement: HTMLElement
) => {
  const childRect = getDOMRect(childElement);
  const parentRect = getDOMRect(parentElement);

  const top = Math.round(childRect.top - parentRect.top);
  const left = Math.round(childRect.left - parentRect.left);

  return { top, left };
};

const normalizeAngle = (angle = 0) => {
  let newAngle = angle % 360;

  if (newAngle < 0) {
    newAngle += 360;
  }

  return Math.round(Math.abs(newAngle));
};

const calculateAngle = (p1: Coordinate, p2: Coordinate) =>
  (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI;

// const getDirection = (angle: number) => {
//   return (
//     [
//       [
//         'left',
//         (angle < -112.5 && angle > -170) ||
//           (angle > 112.5 && angle < 170) ||
//           angle < -170 ||
//           angle > 170
//       ],
//       [
//         'right',
//         (-10 > angle && angle > -67.5) ||
//           (angle > 10 && angle < 67.5) ||
//           (angle > -10 && angle < 10)
//       ],
//       ['bottom', angle < -67.5 && angle > -112.5],
//       ['top', angle > 67.5 && angle < 112.5]
//     ].filter((v) => v[1])?.[0]?.[0] || ''
//   );

//   // return (
//   //   [
//   //     ['LEFT-BOTTOM', angle < -112.5 && angle > -170],
//   //     ['LEFT-TOP', angle > 112.5 && angle < 170],
//   //     ['RIGHT-BOTTOM', -10 > angle && angle > -67.5],
//   //     ['RIGHT-TOP', angle > 10 && angle < 67.5],
//   //     ['bottom', angle < -67.5 && angle > -112.5],
//   //     ['left', angle < -170 || angle > 170],
//   //     ['right', angle > -10 && angle < 10],
//   //     ['top', angle > 67.5 && angle < 112.5]
//   //   ].filter((v) => v[1])?.[0]?.[0] || ''
//   // );

//   // angle < -112.5 && angle > -170

//   // return (
//   //   [
//   //     ['left', angle < -170 || angle > 170],
//   //     ['right', angle > -10 && angle < 10],
//   //     ['bottom', angle < -67.5 && angle > -112.5],
//   //     ['top', angle > 67.5 && angle < 112.5]
//   //   ].filter((v) => v[1])?.[0]?.[0] || ''
//   // );
// };

export const getPositionTile = (event: MouseEvent | TouchEvent): Coordinate => {
  const { left, top } = getDOMRect($('#control') as HTMLElement);

  let clientX = 0;
  let clientY = 0;

  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else if (event instanceof TouchEvent) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  }

  const x = Math.round(clientX - left);
  const y = Math.round(clientY - top);

  return { x, y };
};

// const positionArrow = (index: number) => {
//   const bow = $(`#bow-${index}`) as HTMLElement;
//   const arrow = $(`#arrow-${index}`) as HTMLElement;
//   const { top, left } = getPositionRelativeToParent(
//     $('.game') as HTMLElement,
//     bow
//   );

//   const { width, height } = getDOMRect(bow);

//   // console.log(width);

//   console.log({ top, left, width, height });

//   addStyle(arrow, {
//     left: `${left + height / 2}px`,
//     top: `${DATA_BOW_ARROW[index - 1].bow.top}px`
//   });

//   // console.log('bow', bow);
//   // console.log('arrow', arrow);
//   // // Se obtiene el ancho del arco
// };

// const rotateArrow = (angle: number) => {};

// function actualizarPosicionPuntaFlecha(
//   anguloLanzamiento: number,
//   flechaDiv: HTMLElement
// ) {
//   const puntaDiv = document.getElementById('punta');
//   const posicionFlecha = flechaDiv.getBoundingClientRect();
//   const anchoFlecha = posicionFlecha.width;
//   const altoFlecha = posicionFlecha.height;

//   // Calcula la posición de la punta de la flecha en función del ángulo
//   const radianes = (anguloLanzamiento * Math.PI) / 180;
//   const xPunta =
//     posicionFlecha.left +
//     anchoFlecha / 2 +
//     (altoFlecha / 2) * Math.sin(radianes);
//   const yPunta =
//     posicionFlecha.top + altoFlecha / 2 - (altoFlecha / 2) * Math.cos(radianes);

//   // Actualiza la posición de la punta
//   // puntaDiv.style.left = `${xPunta - puntaDiv.offsetWidth / 2}px`;
//   // puntaDiv.style.top = `${yPunta - puntaDiv.offsetHeight / 2}px`;
//   const left = xPunta;
//   const top = yPunta;

//   addStyle($('#tmp-ball'), {
//     left: `${left}px`,
//     top: `${top}px`
//   });
// }

function updateArrowTipPosition(
  launchAngle: number,
  arrowDiv: HTMLElement,
  index: number
) {
  const arrowPosition = getDOMRect(arrowDiv);
  const arrowWidth = arrowPosition.width;
  const arrowHeight = arrowPosition.height;

  // const adjustedAngle = scaleY === '1' ? launchAngle : -launchAngle;

  // Calculate the position of the arrow tip based on the launch angle
  // const radians = (launchAngle * Math.PI) / 180;
  // const radians = (adjustedAngle * Math.PI) / 180;
  // const xTip =
  //   arrowPosition.left + arrowWidth / 2 + (arrowHeight / 2) * Math.sin(radians);
  // const yTip =
  //   arrowPosition.top +
  //   (scaleY === '1' ? arrowHeight : 0) +
  //   arrowHeight / 2 -
  //   (arrowHeight / 2) * Math.cos(radians);

  const adjustedAngle = launchAngle * (index === 1 ? 1 : -1);

  const radians = (adjustedAngle * Math.PI) / 180;

  const xTip =
    arrowPosition.left + arrowWidth / 2 + (arrowHeight / 2) * Math.sin(radians);

  const yTip =
    arrowPosition.top +
    (index === 2 ? arrowHeight - 20 : 0) +
    arrowHeight / 2 -
    (arrowHeight / 2) * Math.cos(radians);

  // Update the position of the tip
  // tipDiv.style.left = `${xTip - tipDiv.offsetWidth / 2}px`;
  // tipDiv.style.top = `${yTip - tipDiv.offsetHeight / 2}px`;

  return { x: xTip, y: yTip };
}

/**
 * Función que haría el proceso de girar el arco del jugador...
 * @param destination
 */
const rotateBow = (destination: Coordinate) => {
  const bow = $('#bow-1') as HTMLElement;
  // Se establece la posición del arco con respecto a los controles...
  const { left: x, top: y } = getPositionRelativeToParent(
    $('#control') as HTMLElement,
    bow
  );

  // Se obtiene el ancho del arco
  const { width } = getDOMRect(bow);
  // El punto de giro del arco...
  const pivot: Coordinate = { x: Math.round(x + width / 2), y };

  // TODO: Eliminar no es necesario...
  // addStyle($('#pivot'), {
  //   left: `${pivot.x}px`,
  //   top: `${pivot.y}px`
  // });
  // console.log({ width });

  // console.log({ x, y });

  // console.log(
  //   getPositionRelativeToParent(
  //     $('#control') as HTMLElement,
  //     $('#bow-1') as HTMLElement
  //   )
  // );

  // const { left: x, top: y } = DATA_BOW_ARROW[0].bow;
  const angle = calculateAngle(pivot, destination);

  // const direction = getDirection(angle);

  // if (['left', 'right'].includes(direction as string)) {
  // const newAngle = Math.round(270 + (90 - Math.abs(angle)));
  const newAngle = normalizeAngle(angle);

  // console.log({ newAngle });
  // console.log({ newAngle });
  if (newAngle >= 180 && newAngle <= 360) {
    addStyle(bow, { transform: `rotate(${newAngle}deg)` });
    const angleArrow = newAngle - 270;
    // console.log({ angleArrow }, newAngle - 270);
    // Tiene que ser dinamico...
    // const diference = (ANIMATION[0].angle - angleArrow);
    // console.log({ diference });
    ANIMATION[0].angle = angleArrow;
    addStyle($('#arrow-1'), { transform: `rotate(${angleArrow}deg)` });
    // updateArrowTipPosition(angleArrow, $('#arrow-1') as HTMLElement);
  }
  // console.log({ newAngle, angleArrow });
  /*
  90 es 180
  180 es 270
  270 es a 0
  360 es 90
  */
  // }

  // positionArrow(1);

  // }

  // transition: all 140ms ease;

  // if (['left', 'right'].includes(direction as string)) {
  //   // console.log('INGRESA A MOVER');
  //   console.log('DIRECTION:', direction);
  // }
};

// function moveArrow(x, y, angle, distance) {
//   const angleInRadians = (angle - 90) * (Math.PI / 180);

//   const newX = x + distance * Math.cos(angleInRadians);
//   const newY = y + distance * Math.sin(angleInRadians);

//   if (newX < 0 || newY < 0) {
//     console.log("La flecha salió del escenario.");
//     return { x, y, angle };
//   }

//   return { x: newX, y: newY, angle };
// }

const updateScore = () =>
  setHtml(
    $('.score') as HTMLElement,
    `<span>${ANIMATION[0].score}</span> - <span>${ANIMATION[1].score}</span>`
  );

/**
 * Retorna los tatgets que están visibles...
 * @returns
 */
const getVisibleTargets = () =>
  [...$$('.target')].filter(
    (v) => !hasClass(v as HTMLElement, HIDE_TARGET_CLASS)
  );

// function isRectColliding(rect1: DOMRect, rect2: DOMRect) {
//   // const body = $('body');
//   // const scale = +(body?.style?.transform?.match(/[\d\.]+/)?.[0] || '1');
//   // const zoom = +(
//   //   (body?.style as CSSStyleDeclaration & { zoom: string })?.zoom?.match(
//   //     /[\d\.]+/
//   //   )?.[0] || '100'
//   // );

//   // const finalScale = !isNaN(scale) ? +scale : 1;
//   // const finalZoom = !isNaN(zoom) ? +zoom : 100;
//   // const zoomRemove = (100 - finalZoom) / 100;

//   // const realDimension = Math.round(
//   //   30 * finalScale - 30 * finalScale * zoomRemove
//   // );

//   // console.log({ finalScale, finalZoom, zoomRemove, realDimension });

//   // const reemplace =
//   //   rect1.x + 18 >= rect2.x &&
//   //   rect2.x + 30 >= rect1.x &&
//   //   rect1.y + 90 >= rect2.y &&
//   //   rect2.y + 30 >= rect1.y;

//   // const rect1Position = {
//   //   start: {
//   //     x: Math.round(rect1.x),
//   //     y:  Math.round(rect1.y),
//   //   },
//   //   end : {
//   //     x: Math.round(rect1.x + rect1.width),
//   //     y: Math.round(rect1.y + rect1.height),
//   //   }
//   // };

//   // const arrow = {

//   // }

//   const rect2Position = {
//     start: {
//       x: Math.round(rect2.x),
//       y: Math.round(rect2.y)
//     },
//     end: {
//       x: Math.round(rect2.x + rect2.width),
//       y: Math.round(rect2.y + rect2.height)
//     }
//   };

//   addStyle($('#tmp-ball'), { left: `${rect1.x}px`, top: `${rect1.y}px` });

//   const reemplace =
//     rect1.x >= rect2Position.start.x &&
//     rect1.y >= rect2Position.start.y &&
//     rect1.x <= rect2Position.end.x &&
//     rect1.y <= rect2Position.end.y;

//   // const reemplace =
//   //   rect1.x + rect1.width >= rect2.x &&
//   //   rect2.x + rect2.width >= rect1.x &&
//   //   rect1.y + rect1.height >= rect2.y &&
//   //   rect2.y + rect2.height >= rect1.y;

//   if (reemplace) {
//     console.log({ x: rect1.x, y: rect1.y });
//     console.log(rect2Position);
//     // debugger;
//   }

//   return reemplace;
// }

const isPointInside = (
  point: Coordinate,
  container: { start: Coordinate; end: Coordinate }
) => {
  return (
    point.x >= container.start.x &&
    point.y >= container.start.y &&
    point.x <= container.end.x &&
    point.y <= container.end.y
  );
};

const isCollision = (index: number, target: HTMLElement) => {
  const arrow = $(`#arrow-${index}`) as HTMLElement;
  const { angle } = ANIMATION[index - 1];
  const { x, y } = updateArrowTipPosition(angle, arrow, index);
  const targetPosition = getDOMRect(target);

  // const rectArrowPosition = {
  //   start: {
  //     x: arrowPosition.x,
  //     y: arrowPosition.y
  //   },
  //   end: {
  //     x: arrowPosition.x + 10,
  //     y: arrowPosition.y + 10,
  //   }
  // };

  const rectTargetPosition = {
    start: {
      x: Math.round(targetPosition.x),
      y: Math.round(targetPosition.y)
    },
    end: {
      x: Math.round(targetPosition.x + targetPosition.width),
      y: Math.round(targetPosition.y + targetPosition.height)
    }
  };

  const collision =
    isPointInside({ x: x - 3, y }, rectTargetPosition) ||
    isPointInside({ x, y }, rectTargetPosition) ||
    isPointInside({ x: x + 3, y }, rectTargetPosition);

  // const collision = isPointInside(rectArrowPosition.start, rectTargetPosition) ||
  // isPointInside(rectArrowPosition.end)
  //   arrowPosition.x >= rectTargetPosition.start.x &&
  //   arrowPosition.y >= rectTargetPosition.start.y &&
  //   arrowPosition.x <= rectTargetPosition.end.x &&
  //   arrowPosition.y <= rectTargetPosition.end.y;

  // const collision =
  //   arrowPosition.x >= rectTargetPosition.start.x &&
  //   arrowPosition.y >= rectTargetPosition.start.y &&
  //   arrowPosition.x <= rectTargetPosition.end.x &&
  //   arrowPosition.y <= rectTargetPosition.end.y;

  addStyle($(`#tmp-${index}`), {
    left: `${x}px`,
    top: `${y}px`
  });

  return collision;
};

// interface Colliding {
//   c: Coordinate;
//   w: number;
//   h: number;
// }

// const isRectColliding2 = (arrow: HTMLElement, target: HTMLElement) => {
//   const parent = $('.game') as HTMLElement;
//   const arrowPosition = getPositionRelativeToParent(parent, arrow);
//   const targetPosition = getPositionRelativeToParent(parent, target);
//   const { width: wa, height: ha } = getDOMRect(arrow);
//   const { width: wt, height: ht } = getDOMRect(target);

//   console.log({ arrowPosition, targetPosition, wa, ha, wt, ht });

//   const reemplace =
//     arrowPosition.left + wa >= targetPosition.left &&
//     targetPosition.left + wt >= arrowPosition.left &&
//     arrowPosition.top + ha >= targetPosition.top &&
//     targetPosition.top + ht >= arrowPosition.top;

//   return reemplace;

//   // getPositionRelativeToParent
// };

// const checkCollision = (index: number) => {
//   const targets = getVisibleTargets();
//   const arrow = $(`#arrow-${index}`) as HTMLElement;

//   for (const target of targets) {
//     const currentTarget = target as HTMLElement;
//     const result = isRectColliding2(arrow, currentTarget);

//     // const result = isRectColliding(
//     //   getDOMRect($(`#arrow-${index}`) as HTMLElement),
//     //   getDOMRect(currentTarget)
//     // );

//     if (result && !hasClass(currentTarget, HIDE_TARGET_CLASS)) {
//       classList(currentTarget, HIDE_TARGET_CLASS, 'add');
//       ANIMATION[index - 1].score++;
//       debugger;
//       // Actualizar el UI y también determinar quien ha ganado...
//       updateScore();
//     }
//   }
// };

const checkCollision = (index: number) => {
  const targets = getVisibleTargets();

  for (const target of targets) {
    const currentTarget = target as HTMLElement;
    const result = isCollision(index, currentTarget);
    // const result = isRectColliding(
    //   getDOMRect($(`#arrow-${index}`) as HTMLElement),
    //   getDOMRect(currentTarget)
    // );

    if (result && !hasClass(currentTarget, HIDE_TARGET_CLASS)) {
      classList(currentTarget, HIDE_TARGET_CLASS, 'add');
      ANIMATION[index - 1].score++;
      // Actualizar el UI y también determinar quien ha ganado...
      updateScore();
    }
  }
};

const validateNextTurnOrGameOver = () => {
  // Saber si uno de los dos ya logró tener el score esperado...
  const winner = ANIMATION.findIndex((v) => v.score >= MAX_SCORE);
  // let generateNewTurn = false;

  if (winner >= 0) {
    clearIntervals();
    IS_GAME_OVER = true;
    const winUI = $('.win-ui') as HTMLElement;
    const name = winner === 0 ? 'RED' : 'BLUE';
    const color = winner === 0 ? 'r' : 'b';
    setHtml(winUI, `<span>${name} WIN</span>`);
    classList(winUI, HIDE_TARGET_CLASS, 'remove');
    classList(winUI, color, 'add');
  } else {
    // Buscar si aún hay targets...
    const targets = getVisibleTargets();
    const hasArrows = ANIMATION.filter((v) => v.hasArrow).length !== 0;

    // generateNewTurn = targets.length === 0 || !hasArrows;

    if (targets.length === 0 || !hasArrows) {
      clearIntervals();
      arrowReleaseTurn();
    }
  }

  // console.log({ generateNewTurn });

  // if (generateNewTurn) {

  // }
  // console.log({ MAX_SCORE });
};

const validateArrowOutsiteStage = (x: number, y: number) =>
  y < -100 || x < -50 || y > HEIGHT + 100 || x > WIDTH + 50;

const moveArrow = (index = 1) => {
  const arrow = $(`#arrow-${index}`) as HTMLElement;
  const { angle, point } = ANIMATION[index - 1];

  const angleInRadians = (angle - 90) * (Math.PI / 180);

  const newX = point.x + 15 * Math.cos(angleInRadians) * (index === 1 ? 1 : -1);
  const newY = point.y + 15 * Math.sin(angleInRadians) * (index === 1 ? 1 : -1);
  // console.log({ w, h });

  // console.log(ANIMATION[index - 1]);
  // 18x90

  // const { x, y } = movePointAtAngle(point, angle, 20);
  ANIMATION[index - 1].point = { x: newX, y: newY };
  // console.log(ANIMATION[index - 1].point);
  addStyle(arrow, { left: `${newX}px`, top: `${newY}px` });

  if (validateArrowOutsiteStage(newX, newY)) {
    console.log('TERMINA');
    ANIMATION[index - 1].animate = false;
    clearInterval(ANIMATION[index - 1].interval);

    const hasArrows = ANIMATION[index - 1].arrows > 0;

    ANIMATION[index - 1].hasArrow = hasArrows;

    if (hasArrows) {
      const { left, top } = DATA_BOW_ARROW[index - 1].arrow;
      addStyle(arrow, { left: `${left}px`, top: `${top}px` });
      classList(
        $(`#ac-${index}-${ANIMATION[index - 1].arrows}`),
        HIDE_TARGET_CLASS,
        'add'
      );

      ANIMATION[index - 1].arrows--;
      if (index === 2) {
        validateBotMovement();
      }
    } else {
      addStyle($(`#bow-${index}`), {
        transform: `rotate(${DATA_BOW_ARROW[index - 1].bow.rotation}deg)`
      });
    }
    validateNextTurnOrGameOver();
  } else {
    checkCollision(index);
  }

  // addStyle($('#arrow-1'), { transform: `rotate(${angleArrow}deg)` });

  // movePointAtAngle
};

const shotArrow = (index = 1) => {
  // console.log(ANIMATION[index - 1]);

  const { left, top } = DATA_BOW_ARROW[index - 1].arrow;
  ANIMATION[index - 1].point = { x: left, y: top };
  // console.log(getDOMRect($(`#arrow-${index}`) as HTMLElement));
  // const { width, height } = getDOMRect($(`#arrow-${index}`) as HTMLElement);
  // ANIMATION[index - 1].w = width;
  // ANIMATION[index - 1].h = height;
  ANIMATION[index - 1].animate = true;
  ANIMATION[index - 1].interval = setInterval(() => moveArrow(index), 1);

  // console.log(arrow.style.transform);
};

const handleMouseDown = (event: MouseEvent | TouchEvent) => {
  if (
    !IS_GAME_OVER &&
    !IS_MOUSE_DOWN &&
    !ANIMATION[0].animate &&
    ANIMATION[0].hasArrow
  ) {
    // console.log($('#bow-1')!.getBoundingClientRect());
    rotateBow(getPositionTile(event));
    IS_MOUSE_DOWN = true;
    // INITIAL_POINT_CLICK = getPositionTile(event);
    console.log('handleMouseDown');
  }
};

const handleMouseUp = () => {
  if (!IS_GAME_OVER && IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    shotArrow();
    console.log('handleMouseUp');
    IS_MOUSE_DOWN = false;
  }
};

const handleMouseMove = (event: MouseEvent | TouchEvent) => {
  if (!IS_GAME_OVER && IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    rotateBow(getPositionTile(event));
  }
};

const clearIntervals = () => {
  if (BOW_INTERVAL_FOLLOW_TARGET) {
    clearInterval(BOW_INTERVAL_FOLLOW_TARGET);
  }

  for (let i = 0; i < ANIMATION.length; i++) {
    // En este caso quitar los intervalos de movimiento de las flechas...
    if (ANIMATION[i].interval) {
      clearInterval(ANIMATION[i].interval);
    }
  }
};

/**
 * Para hacer el movimiento del BOT...
 */
const validateBotMovement = () => {
  // El indice del target al cual aputará el bot...
  let targets = getVisibleTargets();

  // console.log({ totalTargets });

  if (targets.length === 0) {
    return;
  }

  let targetBot = randomNumber(0, targets.length - 1);
  let target = targets[targetBot] as HTMLElement;
  const bow = { x: DATA_BOW_ARROW[1].bow.left, y: DATA_BOW_ARROW[1].bow.top };
  let counterToShoot = 0;

  /**
   * TODO: Se podría modificar la velocidad dependiendo de la dificultad...
   * también el counterToShoot podría jugar un papel en ello...
   */
  // console.log({ targetBotIndex });
  BOW_INTERVAL_FOLLOW_TARGET = setInterval(() => {
    const { left: x, top: y } = getPositionRelativeToParent(
      $('.game') as HTMLElement,
      target
    );

    const angle = normalizeAngle(calculateAngle(bow, { x, y }));

    addStyle($('#bow-2'), { transform: `rotate(${angle}deg)` });

    const angleArrow = angle - 270;
    // console.log({ angleArrow }, newAngle - 270);
    // Tiene que ser dinamico...
    // const diference = (ANIMATION[0].angle - angleArrow);
    // console.log({ diference });
    ANIMATION[1].angle = angleArrow;
    addStyle($('#arrow-2'), { transform: `rotate(${angleArrow}deg)` });

    counterToShoot++;

    if (counterToShoot % 20 === 0) {
      console.log({ counterToShoot });
      let stopInterval = true;

      /**
       * TODO, puede ser dependiendo del nivel
       * Se valida si el target estña visible, si no, se busca otro target
       */
      if (hasClass(target, HIDE_TARGET_CLASS)) {
        targets = getVisibleTargets();
        console.log('DEBE BUSCAR OTRO BLANCO');

        if (targets.length !== 0) {
          targetBot = randomNumber(0, targets.length - 1);
          target = targets[targetBot] as HTMLElement;
          stopInterval = false;
        }
      }

      if (stopInterval) {
        clearInterval(BOW_INTERVAL_FOLLOW_TARGET);
        shotArrow(2);
      }
    }
    // console.log('ANGULO ES: ', normalizeAngle(calculateAngle(bow, { x, y })));
  }, 100);
};

const arrowReleaseTurn = () => {
  // Agregar los primeros targets en el escenario
  const typeTarget = randomNumber(0, TYPES.length - 1);
  // const typeTarget = 3;
  // const typeTarget = 2;
  setHtml($('#r-target'), Targets(typeTarget));
  // IS_ANIMATED_TARGET_SHOOTING = TYPES[typeTarget].a || false;
  // Establecer las posiciones de los Arrowws...
  DATA_BOW_ARROW.forEach(({ arrow, bow }, index) => {
    // Se pone los arcos en la rotación correcta...
    addStyle($(`#bow-${index + 1}`), {
      transform: `rotate(${bow.rotation}deg)`
    });

    // Ahora se pone las flechas en la posición y águlo inicial...
    addStyle($(`#arrow-${index + 1}`), {
      left: `${arrow.left}px`,
      top: `${arrow.top}px`,
      transform: `rotate(${arrow.rotation}deg)`,
      display: 'block'
    });
  });

  // Reiniciar los valores de ANIMATION
  for (let i = 0; i < ANIMATION.length; i++) {
    ANIMATION[i].animate = false;
    // ANIMATION[i].score = 0;
    ANIMATION[i].arrows = 2;
    ANIMATION[i].hasArrow = true;
    // En este caso quitar los intervalos de movimiento de las flechas...
    if (ANIMATION[i].interval) {
      clearInterval(ANIMATION[i].interval);
    }

    for (let c = 1; c <= 3; c++) {
      classList(
        $(`#ac-${i + 1}-${c}`),
        HIDE_TARGET_CLASS,
        c === 3 ? 'add' : 'remove'
      );
    }
  }

  validateBotMovement();
};

export const addEvents = () => {
  const eventPairs: [string, (event: MouseEvent | TouchEvent) => void][] = [
    ['mousedown', handleMouseDown],
    ['mouseup', handleMouseUp],
    ['mousemove', handleMouseMove],
    ['touchstart', handleMouseDown],
    ['touchend', handleMouseUp],
    ['touchmove', handleMouseMove],
    ['mouseleave', handleMouseUp]
  ];

  eventPairs.forEach((v) => $on($('#control') as HTMLElement, v[0], v[1]));

  // Para el botón salir...
  $on($('#exit') as HTMLElement, 'click', () => {
    clearIntervals();
    console.log('IR A LA PÁGINA DEL LOBBY');
  });

  updateScore();

  IS_GAME_OVER = false;
  for (let i = 0; i < ANIMATION.length; i++) {
    ANIMATION[i].score = 0;
  }

  // Para el contador de entrada...
  let inputCounter = 3;
  const inputInterval = setInterval(() => {
    setHtml($('.lock-ui'), String(inputCounter));
    inputCounter--;

    if (inputCounter < 0) {
      classList($('.lock-ui'), HIDE_TARGET_CLASS, 'add');
      clearInterval(inputInterval);
      arrowReleaseTurn();
    }
  }, 1000);

  // Crear el lanzamiento...
  // arrowReleaseTurn();

  // const { x, y } = updateArrowTipPosition(0, $('#arrow-1') as HTMLElement);

  // // const rect1 = getDOMRect($('#arrow-1') as HTMLElement);

  // addStyle($('#tmp-ball'), {
  //   left: `${x}px`,
  //   top: `${y}px`
  // });

  // const tmp = { x: DATA_BOW_ARROW[1].bow.left, y: DATA_BOW_ARROW[1].bow.top };

  // const { left: x, top: y } = getPositionRelativeToParent(
  //   $('.game') as HTMLElement,
  //   $('#t-1') as HTMLElement
  // );

  // console.log('ANGULO ES: ', normalizeAngle(calculateAngle(tmp, { x, y })));
};
