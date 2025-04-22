import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
  },
  item: {
    paddingLeft: 16,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemText: {
    marginBottom: 4,
  },
  price: {
    paddingLeft: 16,
    alignSelf: 'center',
    minWidth: 80,
    textAlign: 'right',
  },
  img: {
    height: 48,
    width: 48,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
});

export default style;
