import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  itemsContainer: {
    marginTop: 16,
  },
  itemWrapper: {
    marginBottom: 8,
    position: 'relative',
  },
  dropdownContainer: {
    position: 'absolute',
    right: 8,
    top: '100%',
    zIndex: 1000,
    elevation: 1000,
  },
}); 