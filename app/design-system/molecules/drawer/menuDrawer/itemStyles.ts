import {StyleSheet} from 'react-native';

const itemStyles = StyleSheet.create({
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
  sections: {
    paddingVertical: 8,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 4,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#202124',
    letterSpacing: 0.1,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EAED',
    marginVertical: 8,
    marginHorizontal: 24,
  },
  footer: {
    padding: 8,
  },
  setupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 4,
  },
  setupText: {
    fontSize: 16,
    color: '#5f6368',
    letterSpacing: 0.1,
    marginLeft: 12,
  },
});

export default itemStyles;
