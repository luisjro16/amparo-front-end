import React, { useState, useRef } from 'react'; // <-- Importe o useRef aqui
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';
import { notificarEstoqueBaixo } from '../../services/notificacao';

export default function AlarmScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { agendamentoId: initialAgendamentoId } = route.params;

  // Trocamos o agendamentoId fixo por um Estado, para podermos mudar o ID dinamicamente
  const [currentAgendamentoId, setCurrentAgendamentoId] = useState(initialAgendamentoId);
  const [agendamento, setAgendamento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // O useRef guarda um backup seguro dos dados ANTES de qualquer edição
  const agendamentoRef = useRef<any>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAgendamentoDetails = async () => {
        setLoading(true);
        try {
          // 1. Tenta buscar pelo ID atual
          const response = await api.get(`/api/agendamentos/${currentAgendamentoId}/`);
          setAgendamento(response.data);
          agendamentoRef.current = response.data; // Atualiza o backup
        } catch (error: any) {
          
          // 2. Se deu 404, MAS nós temos o backup na memória...
          if (error.response && error.response.status === 404 && agendamentoRef.current) {
            console.log("Procurando o agendamento recriado pós-edição...");
            try {
              // Puxa a lista completa
              const listaResponse = await api.get('/api/agendamentos/');
              const novaLista = listaResponse.data;

              // Encontra o novo ID: mesmo remédio e mesmo horário!
              const novoAgendamento = novaLista.find((a: any) =>
                a.medicamento.id === agendamentoRef.current.medicamento.id &&
                a.horario === agendamentoRef.current.horario
              );

              if (novoAgendamento) {
                // MÁGICA: Substitui o ID velho pelo novo por debaixo dos panos!
                setCurrentAgendamentoId(novoAgendamento.id);
                setAgendamento(novoAgendamento);
                agendamentoRef.current = novoAgendamento;
                setLoading(false);
                return; // Sai da função com sucesso, a tela vai recarregar linda e com estoque!
              }
            } catch (e) {
              console.error("Erro na busca de recuperação:", e);
            }
          }

          // 3. Se não encontrar o novo (ex: o usuário editou e MUDOU A HORA do remédio)
          Alert.alert("Lembrete Expirado", "O horário deste tratamento foi alterado e este alarme não é mais válido.");
          navigation.navigate('Home');
        } finally {
          setLoading(false);
        }
      };

      fetchAgendamentoDetails();
    }, [currentAgendamentoId]) // <-- Agora depende do currentAgendamentoId
  );

  const handleRegister = async (tomou: boolean) => {
    try {
      const response = await api.post('/api/registros/', {
        agendamento: currentAgendamentoId, // <-- ATENÇÃO: Troque agendamentoId por currentAgendamentoId aqui!
        tomou: tomou,
        data_hora_tomada: new Date().toISOString(),
      });

      Alert.alert("Registrado!", tomou ? "Bom trabalho!" : "Dose registrada como não tomada.");
      
      if (tomou) {
        const medBackend = response.data?.agendamento?.medicamento;
        if (medBackend) {
          const estoqueAtual = parseFloat(medBackend.estoque_atual);
          const avisoMinimo = parseInt(medBackend.aviso_estoque_minimo, 10);
          if (estoqueAtual <= avisoMinimo) {
            await notificarEstoqueBaixo(medBackend.nome, estoqueAtual);
          }
        }
      }
      navigation.navigate('Home'); 
    } catch (error) {
      console.error("Erro ao registrar tomada:", error);
      Alert.alert("Erro", "Não foi possível registrar a ação.");
    }
  };

  if (loading || !agendamento) {
    return <View style={styles.container}><ActivityIndicator size="large" color="#3F7EE4" /></View>;
  }

  // MÁGICA DA VALIDAÇÃO DE ESTOQUE (Continua igual ao seu código...)
  const estoqueAtual = parseFloat(agendamento.medicamento.estoque_atual) || 0;
  const semEstoque = estoqueAtual <= 0;

  return (
    <View style={styles.container}>
      {semEstoque ? (
        <MaterialCommunityIcons name="package-variant-remove" size={80} color="crimson" style={styles.bellIcon} />
      ) : (
        <FontAwesome5 name="bell" size={80} color="#3F7EE4" style={styles.bellIcon} />
      )}

      <Text style={[styles.title, semEstoque && { color: 'crimson' }]}>
        {semEstoque ? 'Estoque Esgotado!' : 'Hora da Medicação!'}
      </Text>
      
      <Text style={styles.time}>{format(parseISO(`1970-01-01T${agendamento.horario}`), 'HH:mm')}</Text>
      <Text style={styles.medication}>
        {agendamento.medicamento.nome} {agendamento.medicamento.dosagem_valor} {agendamento.medicamento.dosagem_unidade}
      </Text>

      {semEstoque && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Você não possui este medicamento em estoque no aplicativo. Registre que pulou a dose ou atualize seu estoque.
          </Text>
        </View>
      )}

      {!semEstoque ? (
        <>
          <TouchableOpacity style={styles.primaryButton} onPress={() => handleRegister(true)}>
            <Text style={styles.primaryButtonText}>Remédio tomado!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleRegister(false)}>
            <Text style={styles.secondaryButtonText}>Pular dose.</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => navigation.navigate('CadastroMedicamento', { isEditing: true, medicamentoData: agendamento.medicamento })}
          >
            <Text style={styles.primaryButtonText}>Renovar Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleRegister(false)}>
            <Text style={styles.secondaryButtonText}>Pular dose</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bellIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F7EE4',
  },
  time: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  medication: {
    fontSize: 24,
    color: '#555',
    marginBottom: 60,
  },
  primaryButton: {
    backgroundColor: '#3F7EE4',
    width: '80%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#E9E9E9',
    width: '80%',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 30,
  },
  warningText: {
    color: '#856404',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  linkButton: {
    marginTop: 25,
    padding: 10,
  },
  linkButtonText: {
    color: '#3F7EE4',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});