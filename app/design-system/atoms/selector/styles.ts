import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  selectorError: {
    borderColor: '#e53935',
  },
  selectorDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  selectedText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
  },
  placeholderText: {
    color: '#aaa',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 260,
    maxWidth: 340,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 6,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 12,
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
