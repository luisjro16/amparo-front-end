import React, { useMemo } from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface HeaderProps {
  logoSource?: any;
}

const Header: React.FC<HeaderProps> = () => {
  const { colors, highContrast } = useAccessibility();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={highContrast ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Image source={highContrast ? require ('../assets/LogoAmparo.png') : require('../assets/LogoAmparoPreto.png')} style={styles.logo} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.surface,
      paddingTop: getStatusBarHeight(),
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingVertical: 10,
      width: '100%',
    },
    logo: {
      height: 40,
      width: 100,
    },
  });

export default Header;
