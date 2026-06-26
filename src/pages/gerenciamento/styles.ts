import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../contexts/AccessibilityContext';

export const makeStyles = (colors: ColorPalette, fontScale: number) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
  },
  title: {
    color: colors.primary,
    fontSize: 20 * fontScale,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  emptyText: {
    fontSize: 16 * fontScale,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});