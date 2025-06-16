import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#69A9E6',
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#5C9EDC',
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 8,
    marginTop: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 14,
    elevation: 2,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  pinInput: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    elevation: 2,
    alignSelf: 'center',
  },
  keypad: {
    width: '70%',
    marginVertical: 10,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  keypadButton: {
    width: 60,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'rgba(16, 84, 148, 1)',
    borderRadius: 8,
    marginTop: 18,
    width: '50%',
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
