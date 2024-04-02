import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center', /* Centrado horizontal */
    alignItems: 'center', /* Centrado vertical */
    height: '100%', /* Opcional: ajustar la altura según sea necesario */
    padding: 8,
    marginTop: '-15%',
  },
  section: {
    width: '100%',
    padding: 8,
    marginTop: 8,
  },
  input: {
    marginTop: 16,
    marginBottom: 24,
  }
});

export default style;