import Shapes from './Canvas/Shapes';

export function isShape(tool) {
  return Object.values(Shapes).includes(tool);
}