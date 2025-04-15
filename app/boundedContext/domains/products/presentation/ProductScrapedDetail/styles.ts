import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  descriptionContainter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    justifyContent: 'center',
    height: 48,
    width: 48,
  },
  description: {
    paddingLeft: 8,
  },
  currentPriceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  currentPrice: {
    marginRight: 8,
  },
  priceBehaviourSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonSection: {
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
  },
});

export default style;
