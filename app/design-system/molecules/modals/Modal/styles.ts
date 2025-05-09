import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 0,
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    margin: 0,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
  },
  footer: {
    padding: 16,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export default styles;
