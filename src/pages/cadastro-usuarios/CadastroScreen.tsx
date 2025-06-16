import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';

export default function CadastroScreen() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleConfirm = () => {
    if (!username.trim()) {
      Alert.alert('Erro', 'Digite o nome de usuário.');
      return;
    }
    if (pin.length < 4) {
      Alert.alert('Erro', 'O PIN deve ter 4 dígitos.');
      return;
    }
    Alert.alert('Sucesso', `Usuário: ${username}\nPIN: ${pin}`);
    // chamar a API de cadastro
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/LogoAmparo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Cadastre-se agora!</Text>

        <Text style={[styles.label, { marginLeft: 16, width: '100%' }]}>Nome de Usuário</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={[styles.label, { textAlign: 'center', width: '100%' }]}>Digite seu PIN</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            placeholderTextColor="#999"
            secureTextEntry
            editable={false}
            maxLength={4}
            textAlign="center"
          />

          {/* Teclado numérico customizado */}
          <View style={styles.keypad}>
            {[
              ['1', '2', '3'],
              ['4', '5', '6'],
              ['7', '8', '9'],
              ['', '0', ''],
            ].map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keypadRow}>
                {row.map((item, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.keypadButton,
                      item === '' && { backgroundColor: 'transparent' },
                    ]}
                    onPress={() => {
                      if (item !== '') handleKeyPress(item);
                    }}
                    disabled={item === ''}
                    activeOpacity={item === '' ? 1 : 0.7}
                  >
                    <Text style={styles.keypadButtonText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
