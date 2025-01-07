import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const standardPaddedWidth = screenWidth - 100;

const standardModalHeight = screenHeight - 400;

const halfScreenWidth = screenWidth / 2;
const halfScreenHeight = screenHeight / 2;

export { screenWidth, screenHeight, standardPaddedWidth, halfScreenWidth, standardModalHeight, halfScreenHeight };