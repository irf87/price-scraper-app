import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';

const ListScreen = () => {
  const {isOpen, toggleDrawer, spin} = useDrawer();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Icon name="menu" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>Listas</Text>
      </View>

      {isOpen && <Drawer onClose={toggleDrawer} />}

      <View style={styles.content}>
        <Text>Listas Screen Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListScreen; 