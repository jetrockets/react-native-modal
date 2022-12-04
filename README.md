[![npm (scoped)](https://img.shields.io/npm/v/@jetrockets/react-native-modal)](https://www.npmjs.com/package/@jetrockets/react-native-modal)

# @jetrockets/react-native-modal

Light swipeable modal component IOS/Android

<p align="center">
  <img src="/.github/images/android-prev.gif" height="500" />
  <img src="/.github/images/ios-prev.gif" height="500" />
</p>

## Installation

```javascript
yarn add @jetrockets/react-native-modal
```

Next, install react-native-gesture-handler and react-native-reanimated.

```javascript
yarn add react-native-gesture-handler react-native-reanimated
```

## Usage

You only need to call GestureModal component and pass the state to it:

```javascript
...
import { GestureModal } from '@jetrockets/react-native-modal';

function App() {
    return (
        <GestureModal visible={isVisible} setVisible={setVisible}>
            <View>
                <Text>👋 🚀</Text>
            </View>
        </GestureModal>
    )
}
```
