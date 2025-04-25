import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ItemDrawer from './ItemDrawer';
import FooterSectionDrawer from './FooterSectionDrawer';
import DividerDrawer from './DividerDrawer';
import SectionDrawer from './FooterSectionDrawer';
import styles, {DRAWER_WIDTH} from './menuDrawerStyles';

interface Props {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onPress: () => void;
}

const MenuDrawer = ({
  children,
  title,
  isOpen,
  onRequestClose,
  onPress,
}: Props) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  return (
    <Modal visible={isOpen} transparent onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.drawerContainer,
                {transform: [{translateX: slideAnim}]},
              ]}>
              <View style={styles.drawerHeader}>
                <TouchableOpacity onPress={onPress} style={styles.closeButton}>
                  <Icon name="close" size={24} color="#5f6368" />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>{title}</Text>
                </View>
                {children}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

MenuDrawer.Item = ItemDrawer;
MenuDrawer.Divider = DividerDrawer;
MenuDrawer.Footer = FooterSectionDrawer;
MenuDrawer.Section = SectionDrawer;

export default MenuDrawer;
