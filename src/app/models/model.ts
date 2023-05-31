export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Socket = {};

export type Node = {
  id: number;
  icon: string;
  title: string;
  inputSocket?: Socket;
  outputSocket?: Socket;
  initialPosition: Position;
  editing?: boolean;
  linkingFrom?: boolean;
  linkingTo?: boolean;
};

export type Path = {
  from: number | any;
  to: number | any;
};
