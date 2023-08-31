export type Params = Record<string, any>;

export type Callback<T> = (
  index: number,
  updateValue: (value: T) => void
) => string;

export interface ArrowProps {
  id?: string;
  rotation: number;
  left: number;
  top: number;
  scale: number;
}

export interface BowProps extends ArrowProps {
  fill: string;
}

export interface Coordinate {
  x: number;
  y: number;
}
