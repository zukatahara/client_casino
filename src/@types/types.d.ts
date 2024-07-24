type Option = {
  id: string;
  label: string;
  value?: string;
};

type WithClassName<T = {}> = T & {
  className?: string;
};

type ValueOf<T> = T[keyof T];
