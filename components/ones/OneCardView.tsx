import { View, type ViewProps } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useThemeColor } from '@/hooks/useThemeColor';

import { flexStyles } from '@/styles/styles';

import { Colors } from '@/constants/Colors';
import One from '@/models/one';
import { ThemedText } from '../common/ThemedText';
import { ThemedView } from '../common/ThemedView';

export type ThemedViewProps = ViewProps & {
  one: One;
};

export function OneCardView({ one }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

  return (
    <ThemedView style={styles.container}>
      <View style={flexStyles.column}>
      <Image source={one.icon} style={styles.icon} contentFit="contain" />
      <ThemedText type="title">{one.name}</ThemedText>
      </View>
      <View style={flexStyles.column}>
        <ThemedText>Test</ThemedText>

      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#F0E68C', // Khaki color
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6, // Shadow radius for a softer shadow
    elevation: 4,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 12, // Space between the icon and the name
  },
});