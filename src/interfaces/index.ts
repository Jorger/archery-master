export type Params = Record<string, any>;

export type Callback<T> = (
  index: number,
  updateValue: (value: T) => void
) => string;
