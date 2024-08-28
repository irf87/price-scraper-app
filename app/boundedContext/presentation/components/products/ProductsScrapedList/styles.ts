import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    // marginLeft: 16,
    paddingLeft: 16,
    flexGrow: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxWidth: '70%',
  },
  itemText: {
    width: 250,
  },
  price: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  img: {
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
});

export default style;
