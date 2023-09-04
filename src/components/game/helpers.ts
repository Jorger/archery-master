import { HEIGHT, WIDTH } from '../../utils/constants';
import { Targets } from './components/index';
import { TYPES } from './components/targets/helpers';
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
import Screen from '../../screens/index';
import type { BowProps, ArrowProps, Coordinate } from '../../interfaces/index';

let CURRENT_DIFICULTY = 0;
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

const updateArrowTipPosition = (
  launchAngle: number,
  arrowDiv: HTMLElement,
  index: number
) => {
  const arrowPosition = getDOMRect(arrowDiv);
  const arrowWidth = arrowPosition.width;
  const arrowHeight = arrowPosition.height;
  const adjustedAngle = launchAngle * (index === 1 ? 1 : -1);
  const radians = (adjustedAngle * Math.PI) / 180;

  const xTip =
    arrowPosition.left + arrowWidth / 2 + (arrowHeight / 2) * Math.sin(radians);

  const yTip =
    arrowPosition.top +
    (index === 2 ? arrowHeight - 20 : 0) +
    arrowHeight / 2 -
    (arrowHeight / 2) * Math.cos(radians);

  return { x: xTip, y: yTip };
};

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
  const angle = calculateAngle(pivot, destination);

  const newAngle = normalizeAngle(angle);

  if (newAngle >= 180 && newAngle <= 360) {
    addStyle(bow, { transform: `rotate(${newAngle}deg)` });
    const angleArrow = newAngle - 270;

    ANIMATION[0].angle = angleArrow;
    addStyle($('#arrow-1'), { transform: `rotate(${angleArrow}deg)` });
  }
};

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

const isPointInside = (
  point: Coordinate,
  container: { start: Coordinate; end: Coordinate }
) =>
  point.x >= container.start.x &&
  point.y >= container.start.y &&
  point.x <= container.end.x &&
  point.y <= container.end.y;

const isCollision = (index: number, target: HTMLElement) => {
  const arrow = $(`#arrow-${index}`) as HTMLElement;
  const { angle } = ANIMATION[index - 1];
  const { x, y } = updateArrowTipPosition(angle, arrow, index);
  const targetPosition = getDOMRect(target);

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

  return collision;
};

const checkCollision = (index: number) => {
  const targets = getVisibleTargets();

  for (const target of targets) {
    const currentTarget = target as HTMLElement;
    const result = isCollision(index, currentTarget);

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

    const generateNewTurn = targets.length === 0 || !hasArrows;

    if (generateNewTurn) {
      clearIntervals();
      arrowReleaseTurn();
    }
  }
};

const validateArrowOutsiteStage = (x: number, y: number) =>
  y < -100 || x < -50 || y > HEIGHT + 100 || x > WIDTH + 50;

const moveArrow = (index = 1) => {
  const arrow = $(`#arrow-${index}`) as HTMLElement;
  const { angle, point } = ANIMATION[index - 1];

  const angleInRadians = (angle - 90) * (Math.PI / 180);

  const newX = point.x + 15 * Math.cos(angleInRadians) * (index === 1 ? 1 : -1);
  const newY = point.y + 15 * Math.sin(angleInRadians) * (index === 1 ? 1 : -1);
  ANIMATION[index - 1].point = { x: newX, y: newY };
  addStyle(arrow, { left: `${newX}px`, top: `${newY}px` });

  if (validateArrowOutsiteStage(newX, newY)) {
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
};

const shotArrow = (index = 1) => {
  const { left, top } = DATA_BOW_ARROW[index - 1].arrow;
  ANIMATION[index - 1].point = { x: left, y: top };
  ANIMATION[index - 1].animate = true;
  ANIMATION[index - 1].interval = setInterval(() => moveArrow(index), 1);
};

const handleMouseDown = (event: MouseEvent | TouchEvent) => {
  if (
    !IS_GAME_OVER &&
    !IS_MOUSE_DOWN &&
    !ANIMATION[0].animate &&
    ANIMATION[0].hasArrow
  ) {
    rotateBow(getPositionTile(event));
    IS_MOUSE_DOWN = true;
  }
};

const handleMouseUp = () => {
  if (!IS_GAME_OVER && IS_MOUSE_DOWN && !ANIMATION[0].animate) {
    shotArrow();
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
  const counterDificulty = [18, 10, 2][CURRENT_DIFICULTY - 1];

  if (IS_GAME_OVER || targets.length === 0) {
    return;
  }

  let targetBot = randomNumber(0, targets.length - 1);
  let target = targets[targetBot] as HTMLElement;
  const bow = { x: DATA_BOW_ARROW[1].bow.left, y: DATA_BOW_ARROW[1].bow.top };
  let counterToShoot = 0;

  BOW_INTERVAL_FOLLOW_TARGET = setInterval(() => {
    if (IS_GAME_OVER) {
      clearInterval(BOW_INTERVAL_FOLLOW_TARGET);
    }

    const { left: x, top: y } = getPositionRelativeToParent(
      $('.game') as HTMLElement,
      target
    );

    const angle = normalizeAngle(calculateAngle(bow, { x, y }));

    addStyle($('#bow-2'), { transform: `rotate(${angle}deg)` });

    const angleArrow = angle - 270;
    ANIMATION[1].angle = angleArrow;
    addStyle($('#arrow-2'), { transform: `rotate(${angleArrow}deg)` });
    counterToShoot++;

    if (counterToShoot % counterDificulty === 0) {
      let stopInterval = true;

      if (hasClass(target, HIDE_TARGET_CLASS)) {
        targets = getVisibleTargets();

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
  }, 100);
};

const arrowReleaseTurn = () => {
  // Agregar los primeros targets en el escenario
  const typeTarget = randomNumber(0, TYPES.length - 1);
  setHtml($('#r-target'), Targets(typeTarget));
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

export const addEvents = (dificulty: number) => {
  CURRENT_DIFICULTY = dificulty;

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
    Screen('Lobby');
  });

  IS_GAME_OVER = false;
  for (let i = 0; i < ANIMATION.length; i++) {
    ANIMATION[i].score = 0;
  }

  updateScore();

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
};
