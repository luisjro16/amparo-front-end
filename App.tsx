import 'react-native-gesture-handler'; 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Splash from './src/pages/splashe'; 
import LoginScreen from './src/pages/login/LoginScreen'; 
<<<<<<< Updated upstream
import HomeScreen from './src/pages/home/HomeScreen';     
=======
import HomeScreen from './src/pages/home/HomeScreen'; 
import CadastroMedicamentos from './src/pages/cadastrar-medicamentos/Cadastro';      
import CadastroScreen from './src/pages/cadastro-usuarios/CadastroScreen';
import PinScreen from './src/pages/Pin/PinScreen';
>>>>>>> Stashed changes

export type RootStackParamList = {
  Splash: undefined; 
  Login: undefined;  
  Home: undefined;  
<<<<<<< Updated upstream
=======
  Cadastro: undefined;
  CadastroScreen: undefined;
  PinScreen: undefined;
>>>>>>> Stashed changes
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PinScreen" component={PinScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}