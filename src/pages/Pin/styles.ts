import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../contexts/AccessibilityContext';

export const makeStyles = (colors: ColorPalette, fontScale: number) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 220,
    height: 100,
    marginTop: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  subtitle: {
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 23 * fontScale,
    marginBottom: 28,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pinCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textOnPrimary,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pinDot: {
    width: 12,
    height: 12,
    backgroundColor: colors.textOnPrimary,
    borderRadius: 6,
  },
  keypad: {
    width: '70%',
    marginTop: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  key: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  keyText: {
    fontSize: 28 * fontScale,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
  },
  eraseText: {
    fontSize: 12 * fontScale,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },
  faceid: {
    fontSize: 26 * fontScale,
    color: colors.textOnPrimary,
    opacity: 0.8,
  },
});