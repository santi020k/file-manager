export enum types {
  primary = 'primary',
  secondary = 'secondary'
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type: types;
}
