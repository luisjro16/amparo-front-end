import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashLogo from '../../assets/LogoAmparo.png';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  CadastroScreen: undefined; 
  PinScreen: undefined;
};

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkFlow = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');
      if (!hasLaunched) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        navigation.replace('CadastroScreen');
      } else if (!hasLoggedIn) {
        navigation.replace('Login'); //navegação pro primeiro login
      } else {
        navigation.replace('PinScreen'); //se ja tiver feito login uma vez
      }
    };

    const timer = setTimeout(() => {
      checkFlow();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color="#FFF" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#5C9EDC',
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