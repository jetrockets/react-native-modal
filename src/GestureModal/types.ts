import { PropsWithChildren } from 'react';

export type GestureModal = {
  visible: boolean;
  setVisible: (val: boolean) => void;
  destroy: () => void;
};

export type Props = PropsWithChildren<GestureModal>;
