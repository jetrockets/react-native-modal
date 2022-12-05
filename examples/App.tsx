/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import { GestureModal } from '@jetrockets/react-native-modal';
import { Button, SafeAreaView, Text, View } from 'react-native';

const App = () => {
  const [visible, setVisible] = React.useState(false);

  const openModal = React.useCallback(() => setVisible(true), []);

  // console.log('GestureModal', GestureModal);

  return (
    <SafeAreaView>
      <Button title="Open modal" onPress={openModal} />

      <GestureModal visible={visible} setVisible={setVisible}>
        <View style={{ minHeight: 300 }}>
          <Text>👋 🚀</Text>
        </View>
      </GestureModal>
    </SafeAreaView>
  );
};

export default App;
