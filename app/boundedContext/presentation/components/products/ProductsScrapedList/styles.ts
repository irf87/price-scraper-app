import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
  },
  item: {
    marginLeft: 16,
    flexGrow: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  footer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    justifyContent: "center",
    height: 48,
    width: 48,
  }
});

export default style;