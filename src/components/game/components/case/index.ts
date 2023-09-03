import './styles.css';
import { Arrow } from '../index';

interface CaseProps {
  index: number;
  type: 'bottom' | 'top';
}

const Case = ({ index, type }: CaseProps) => {
  return /*html*/ `<div class="case ${type}">
  ${Arrow({ id: `ac-${index}-1`, left: 5, top: -50, rotation: -10, scale: 1 })}
  ${Arrow({ id: `ac-${index}-2`, left: 17, top: -50, rotation: 0, scale: 1 })}
  ${Arrow({ id: `ac-${index}-3`, left: 29, top: -50, rotation: 10, scale: 1 })}
  </div>`;
};

export default Case;
