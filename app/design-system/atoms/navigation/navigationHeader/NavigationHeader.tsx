import React from 'react';

import {Text, View, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title: string;
  toggleDrawer: () => void;
  spin: Animated.AnimatedInterpolation<string | number>;
}

const NavigationHeader = ({toggleDrawer, title, spin}: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Icon name="menu" size={24} color="#000" />
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default NavigationHeader;
