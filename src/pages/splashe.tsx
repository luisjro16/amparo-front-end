import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import SplashLogo from '../../assets/LogoAmparo.png';
import { useAccessibility, ColorPalette } from '../contexts/AccessibilityContext';

const Splash = () => {
  const { colors, fontScale } = useAccessibility();
  const styles = React.useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={colors.textOnPrimary} style={styles.indicator} />
    </View>
  );
};

export const makeStyles = (colors: ColorPalette, fontScale: number) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  indicator: {
    marginTop: 20,
  },
  logo: {
    height: 80,
    marginBottom: 20,
    width: 200,
  },
});

export default Splash;