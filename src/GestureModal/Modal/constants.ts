import { rgba } from 'polished';
import { Platform } from 'react-native';

const TARGET_COLOR = '#51284F';

export const STARTING_POSITION = 100;

const BACKDROP_FACTOR = Platform.select({ android: 0.75, ios: 0.5 });
export const BACKDROP_COLORS = [rgba(TARGET_COLOR, BACKDROP_FACTOR), rgba(TARGET_COLOR, 0)];
