import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert // alert para um exemplo de erro
} from 'react-native';
import { style } from './style'; 
import LogoAmparo from '../../assets/LogoAmparo.png';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { RootStackParamList } from '../../../App';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  // estado para armazenar usuário e senha (exemplo, para simular login)
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
<<<<<<< Updated upstream
=======
  const [loading, setLoading] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false);
>>>>>>> Stashed changes

  const handleLogin = () => {
    // aqui vamos implementar a lógica de autenticação real.

    // exemplo: if usuário/senha forem "test" e "123", go to Home
    if (username === 'test' && password === '123') {
      navigation.replace('Home'); // navega para a Home e substitui a tela de login na pilha
    } else {
      Alert.alert('Erro de Login', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image
          style={style.logo}
          source={LogoAmparo}
          resizeMode="contain"
        />
      </View>

      <View style={style.boxMid}>
        <Text style={style.textTitle}>USUÁRIO</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.textInput}
            placeholder="Digite seu usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <AntDesign
            name='user'
            size={24}
            color='black'
          />
        </View>

        <Text style={style.textTitle}>PIN</Text>
        <View style={style.boxInput}>
          <TextInput
            style={style.textInput}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // ocultar a senha
          />
          <Entypo
            name="eye"
            size={24}
            color="black"
          />
        </View>
<<<<<<< Updated upstream
        <TouchableOpacity> {/* tornar o texto 'esqueci minha senha' clicável */}
=======
        <View style={style.rowBetween}>
          <TouchableOpacity
            style={style.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={rememberMe ? "check-box" : "check-box-outline-blank"}
              size={20}
              color="#fff"
            />
            <Text style={style.rememberMeText}>Lembre-se de mim</Text>
          </TouchableOpacity>
          <TouchableOpacity> 
>>>>>>> Stashed changes
            <Text style={style.textForget}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.boxBottom}>
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>

<<<<<<< Updated upstream
      <TouchableOpacity> {/* tornar o texto 'não tem conta?' clicável */}
        <Text style={style.textBotton}>Não tem conta? Criar agora!</Text>
      </TouchableOpacity>
=======
     <TouchableOpacity onPress={() => navigation.navigate('CadastroScreen')}>
      <Text style={style.textBotton}>Não tem conta? Criar agora!</Text>
    </TouchableOpacity>
>>>>>>> Stashed changes
    </View>
  );
}