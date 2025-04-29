import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [cursorOpacity] = useState(new Animated.Value(1));

  // Typewriter cursor animation
  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    blinkAnimation.start();

    return () => {
      blinkAnimation.stop();
    };
  }, [cursorOpacity]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || t('search.placeholder')}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.input}
        outlineStyle={styles.outline}
        theme={{
          colors: {
            primary: theme.colors.primary,
          },
        }}
      />
      {value.length > 0 && (
        <Animated.View
          style={[
            styles.cursor,
            {opacity: cursorOpacity, backgroundColor: theme.colors.primary},
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 50,
  },
  outline: {
    borderRadius: 8,
  },
  cursor: {
    position: 'absolute',
    right: 12,
    top: 15,
    width: 2,
    height: 20,
  },
});

export default SearchInput;
