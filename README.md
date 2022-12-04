# @jetrockets/react-native-modal

Light swipeable modal component IOS/Android

## Installation

```sh
yarn add @jetrockets/react-native-modal
```

Next, install react-native-gesture-handler and react-native-reanimated.
```sh
yarn add react-native-gesture-handler react-native-reanimated
```


## Usage

You only need to call GestureModal component and pass the state to it:

```sh
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