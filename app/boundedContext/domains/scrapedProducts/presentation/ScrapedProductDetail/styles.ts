import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  lastUpdateContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  lastUpdateText: {
    opacity: 0.7,
  },
  productNameContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  img: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  descriptionContainer: {
    width: '100%',
    marginBottom: 24,
  },
  description: {
    textAlign: 'left',
    width: '100%',
    flexWrap: 'wrap',
  },
  currentPriceSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  currentPriceLabel: {
    marginBottom: 8,
  },
  currentPriceValue: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  priceBehaviourSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priceCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
  },
  priceCardContent: {
    alignItems: 'center',
    padding: 8,
  },
  priceCardIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  priceCardTitle: {
    textAlign: 'center',
    marginBottom: 4,
  },
  priceCardValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  readMoreButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  touchableImageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});

export default style;
