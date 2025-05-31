import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';
import {Menu, TextInput} from 'react-native-paper';

interface SelectProps {
  label: string;
  options: {label: string; value: string | number}[];
  value?: string | number;
  onSelect?: (value: string | number) => void;
}

const Select: React.FC<SelectProps> = ({label, options, value, onSelect}) => {
  const [visible, setVisible] = React.useState(false);
  const [anchorWidth, setAnchorWidth] = React.useState<number>(0);
  const selectedLabel = value
    ? options.find(o => o.value === value)?.label
    : '';

  const handleLayout = (event: LayoutChangeEvent) => {
    setAnchorWidth(event.nativeEvent.layout.width);
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            <View pointerEvents="box-only" onLayout={handleLayout}>
              <TextInput
                label={label}
                value={selectedLabel}
                mode="outlined"
                editable={false}
                right={<TextInput.Icon icon="chevron-down" />}
                style={styles.input}
              />
            </View>
          </TouchableWithoutFeedback>
        }
        style={[styles.menu, anchorWidth ? {width: anchorWidth} : null]}>
        {options?.map(option => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              setVisible(false);
              onSelect?.(option.value);
            }}
            title={option.label}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  menu: {
    // width will be set dynamically
  },
});

export default Select;
