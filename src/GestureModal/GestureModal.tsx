import React from 'react';

import { Modal as RNModal, Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Modal from './Modal';
import { Props } from './types';

const GesturedModal = Platform.select({ android: gestureHandlerRootHOC(Modal) }) || Modal;

const GestureModal = (props: Omit<Props, 'destroy'>) => {
  const [visible, setVisible] = React.useState(props.visible);

  React.useEffect(() => {
    if (props.visible) setVisible(true);
  }, [props.visible]);

  return (
    <RNModal transparent={true} visible={visible}>
      <SafeAreaProvider>
        <GesturedModal {...props} destroy={() => setVisible(false)} />
      </SafeAreaProvider>
    </RNModal>
  );
};

export default GestureModal;
