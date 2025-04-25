import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const DRAWER_WIDTH = width * 0.85;

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#202124',
    letterSpacing: 0.25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 12,
  },
});

export default menuStyles;
