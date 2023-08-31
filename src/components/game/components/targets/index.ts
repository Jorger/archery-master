import './styles.css';

const Target = (id = '', left = 0, top = 0) => {
  return /*html*/ `<div class="target" id=${id} style="left:${left}px;top:${top}px"></div>`;
};

const Targets = (type = 0) => {
  return /*html*/ `<div class="targets" style="width:100px;height:100px">
  ${Target('t-1', 10, 10)}
  ${Target('t-1', 50, 10)}
  ${Target('t-1', 10, 50)}
  ${Target('t-1', 50, 50)}
  </div>`;
};

export default Targets;
