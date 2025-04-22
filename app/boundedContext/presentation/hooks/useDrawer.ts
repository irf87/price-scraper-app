import {useState, useCallback} from 'react';
import {Animated, Easing} from 'react-native';

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation] = useState(new Animated.Value(0));

  const toggleDrawer = useCallback(() => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);

    Animated.timing(rotation, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return {
    isOpen,
    toggleDrawer,
    spin,
  };
}; 