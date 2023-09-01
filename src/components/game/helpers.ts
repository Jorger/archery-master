import type { BowProps, ArrowProps, Coordinate } from '../../interfaces/index';
import { HEIGHT, WIDTH } from '../../utils/constants';
import { $, $$, $on, addStyle, getDOMRect } from '../../utils/helpers';

let IS_MOUSE_DOWN = false;

const ANIMATION: {
  animate: boolean;
  interval?: NodeJS.Timeout;
  angle: number;
  point: Coordinate;
}[] = [
  {
    animate: false,
    angle: 0,
    point: { x: 0, y: 0 }
  },
  {
    animate: false,
    angle: 0,
    point: { x: 0, y: 0 }
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

function isRectColliding(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.x + 18 >= rect2.x &&
    rect2.x + 30 >= rect1.x &&
    rect1.y + 90 >= rect2.y &&
    rect2.y + 30 >= rect1.y
  );
}

const checkCollision = (index: number) => {
  // const { x, y } = ANIMATION[index - 1].point;

  // const targets = [...$$('.target')].map((v) => {
  //   const { top, left } = getPositionRelativeToParent(
  //     $('.game') as HTMLElement,
  //     v as HTMLElement
  //   );

  //   return { id: v.id, x: left, y: top };
  // });

  const targets = [...$$('.target')];

  // console.log('targets', targets);

  // const arrowBounds = {
  //   left: x,
  //   right: x + 18,
  //   top: y,
  //   bottom: y + 90
  // };

  // console.log(arrowBounds);

  for (const target of targets) {
    const result = isRectColliding(
      getDOMRect($(`#arrow-${index}`) as HTMLElement),
      getDOMRect(target as HTMLElement)
    );

    if (result) {
      console.log('colisiona con: ', target);
      clearInterval(ANIMATION[index - 1].interval);
    }

    // const targetBounds = {
    //   left: target.x,
    //   right: target.x + 35,
    //   top: target.y,
    //   bottom: target.y + 35
    // };

    // if (
    //   arrowBounds.left < targetBounds.right &&
    //   arrowBounds.right > targetBounds.left &&
    //   arrowBounds.top < targetBounds.bottom &&
    //   arrowBounds.bottom > targetBounds.top
    // ) {
    //   console.log(arrowBounds);
    //   console.log(targetBounds);
    //   console.log('colisiona con: ', target.id);
    // }
  }

  // return false; // No se detectó colisión con ningún objetivo
};

const moveArrow = (index = 1) => {
  const arrow = $(`#arrow-${index}`) as HTMLElement;
  const { angle, point } = ANIMATION[index - 1];

  const angleInRadians = (angle - 90) * (Math.PI / 180);

  const newX = point.x + 10 * Math.cos(angleInRadians);
  const newY = point.y + 10 * Math.sin(angleInRadians);
  // console.log({ w, h });

  // console.log(ANIMATION[index - 1]);
  // 18x90

  // const { x, y } = movePointAtAngle(point, angle, 20);
  ANIMATION[index - 1].point = { x: newX, y: newY };
  // console.log(ANIMATION[index - 1].point);
  addStyle(arrow, { left: `${newX}px`, top: `${newY}px` });

  if (newY < -100 || newX < -50 || newY > HEIGHT + 100 || newX > WIDTH + 50) {
    console.log('TERMINA');
    ANIMATION[index - 1].animate = false;
    clearInterval(ANIMATION[index - 1].interval);
    const { left, top } = DATA_BOW_ARROW[index - 1].arrow;
    addStyle(arrow, { left: `${left}px`, top: `${top}px` });
  }

  checkCollision(index);

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
  if (!IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    // console.log($('#bow-1')!.getBoundingClientRect());
    rotateBow(getPositionTile(event));
    IS_MOUSE_DOWN = true;
    // INITIAL_POINT_CLICK = getPositionTile(event);
    console.log('handleMouseDown');
  }
};

const handleMouseUp = () => {
  if (IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    shotArrow();
    console.log('handleMouseUp');
    IS_MOUSE_DOWN = false;
  }
};

const handleMouseMove = (event: MouseEvent | TouchEvent) => {
  if (IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    rotateBow(getPositionTile(event));
  }
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

  const tmp = { x: DATA_BOW_ARROW[1].bow.left, y: DATA_BOW_ARROW[1].bow.top };

  const { left: x, top: y } = getPositionRelativeToParent(
    $('.game') as HTMLElement,
    $('#t-1') as HTMLElement
  );

  console.log('ANGULO ES: ', normalizeAngle(calculateAngle(tmp, { x, y })));
};
