import './styles.css';
// import { add } from './script/operation';

const htmlString =
  /*html*/
  `
  <div id="grid-container">
    <div class="grid-item" style="top: 0; left: 0;"></div>
    <div class="grid-item" style="top: 0; left: 100px;"></div>
    <div class="grid-item" style="top: 100px; left: 0;"></div>
    <div class="grid-item" style="top: 100px; left: 100px;"></div>
    <div class="grid-item" style="top: 200px; left: 0"></div>
    <div class="grid-item" style="top: 200px; left: 100px"></div>
  </div>
`;

document.querySelector('body')!.innerHTML = htmlString;

const gridContainer = document.getElementById('grid-container') as HTMLElement;
const gridItems = document.querySelectorAll('.grid-item');

let isMouseDown = false;

function handleMouseDown() {
  isMouseDown = true;
}

function handleMouseUp() {
  isMouseDown = false;
}

function handleMouseMove(event: MouseEvent | Touch) {
  if (isMouseDown) {
    const enterX = event.clientX - gridContainer.getBoundingClientRect().left;
    const enterY = event.clientY - gridContainer.getBoundingClientRect().top;

    for (let i = 0; i < gridItems.length; i++) {
      const gridItem = gridItems[i] as HTMLElement;
      const rect = gridItem.getBoundingClientRect();

      if (
        enterX >= rect.left &&
        enterX <= rect.right &&
        enterY >= rect.top &&
        enterY <= rect.bottom
      ) {
        gridItem.classList.add('active');
      } else {
        gridItem.classList.remove('active');
      }
    }
  }
}

gridContainer.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', handleMouseMove);

gridContainer.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchend', handleMouseUp);
document.addEventListener('touchmove', function (event) {
  if (isMouseDown) {
    handleMouseMove(event.touches[0]);
  }
});

// console.log(htmlString);

// const result = add(2, 10);
// const result2 = add(2, 10);
// console.log({ result, result2 });

/*
/* html {
  border: 1px solid red;
  background-color: blue;
} */
// #grid-container {
//   position: relative;
//   width: 300px;
//   height: 300px;
//   border: 1px solid black;
// }
// .grid-item {
//   position: absolute;
//   width: 100px;
//   height: 100px;
//   background-color: lightblue;
//   transition: background-color 0.3s ease-in-out;
// }

// .grid-item.active {
//   background-color: lightgreen;
// }

/* .grid-item:hover {
  background-color: lightgreen;
} */
