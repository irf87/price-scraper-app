import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  item: {
    marginLeft: 16,
    flexGrow: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  price: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  img: {
    justifyContent: "center",
    height: 48,
    width: 48,
  },
});

export default style;