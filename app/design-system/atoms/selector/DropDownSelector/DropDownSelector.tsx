import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

export interface DropDownSelectorOption {
  value: string | number;
  title: string;
  imageUrl?: string;
}

export interface DropDownSelectorProps {
  options: DropDownSelectorOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  style?: any;
}

const ITEM_HEIGHT = 56;

export const DropDownSelector: React.FC<DropDownSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  error = false,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const selected = options.find(opt => opt.value === value);
  const flatListRef = useRef<FlatList>(null);

  const open = useCallback(() => {
    if (!disabled) {
      setVisible(true);
    }
  }, [disabled]);
  const close = useCallback(() => setVisible(false), []);

  // Scroll to selected item if present
  const onModalShow = useCallback(() => {
    if (selected && flatListRef.current) {
      const idx = options.findIndex(opt => opt.value === selected.value);
      if (idx >= 0) {
        flatListRef.current.scrollToIndex({index: idx, animated: false});
      }
    }
  }, [selected, options]);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.selector,
          error && styles.selectorError,
          disabled && styles.selectorDisabled,
        ]}
        onPress={open}
        activeOpacity={0.7}
        disabled={disabled}>
        {selected?.imageUrl ? (
          <Image source={{uri: selected.imageUrl}} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="image" size={24} color="#bbb" />
          </View>
        )}
        <Text
          style={[styles.selectedText, !selected && styles.placeholderText]}
          numberOfLines={1}>
          {selected ? selected.title : placeholder}
        </Text>
        <Icon
          name={visible ? 'expand-less' : 'expand-more'}
          size={24}
          color="#333"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
        onShow={onModalShow}>
        <Pressable style={styles.overlay} onPress={close}>
          <View style={styles.dropdown}>
            <FlatList
              ref={flatListRef}
              data={options}
              keyExtractor={item => String(item.value)}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              style={{maxHeight: 320}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    close();
                  }}>
                  {item.imageUrl ? (
                    <Image
                      source={{uri: item.imageUrl}}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Icon name="image" size={24} color="#bbb" />
                    </View>
                  )}
                  <Text style={styles.optionText} numberOfLines={1}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              initialNumToRender={10}
              windowSize={10}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DropDownSelector;
