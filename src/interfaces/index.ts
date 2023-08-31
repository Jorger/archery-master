export type Params = Record<string, any>;

export type Callback<T> = (
  index: number,
  updateValue: (value: T) => void
) => string;

export interface BowProps {
  id?: string;
  fill: string;
  rotation: number;
  left: number;
  top: number;
  scale: number;
}

export interface ArrowProps {
  id?: string;
  left: number;
  top: number;
  rotation: number;
}
