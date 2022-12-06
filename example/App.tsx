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
import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [visible, setVisisble] = React.useState(false);

  const openModal = React.useCallback(() => setVisisble(true), []);

  return (
    <SafeAreaView style={StyleSheet.flatten({ flex: 1, justifyContent: 'center', alignItems: 'center' })}>
      <Button title="Open modal" onPress={openModal} />
      <GestureModal visible={visible} setVisible={setVisisble}>
        <View style={styles.wrapper}>
          <View style={styles.pullTargetContainer}>
            <View style={styles.pullTarget} />
          </View>

          <View style={styles.container}>
            <Text style={styles.previewText}>Hello world</Text>
          </View>
        </View>
      </GestureModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  previewText: {
    fontSize: 32,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    minHeight: 300,
    backgroundColor: '#fff',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: Platform.select({ ios: 0, android: 24 }),
  },
  pullTargetContainer: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pullTarget: {
    width: 50,
    height: 4,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
