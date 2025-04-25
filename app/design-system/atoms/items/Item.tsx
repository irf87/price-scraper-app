import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ItemProps {
  imageUrl?: string;
  title: string;
  description: string;
  onPress?: () => void;
  showOptions?: boolean;
  onOptionsPress?: () => void;
}

export const Item: React.FC<ItemProps> = ({
  imageUrl,
  title,
  description,
  onPress,
  showOptions = false,
  onOptionsPress,
}) => {
  const handleOptionsPress = (e: any) => {
    e.stopPropagation();
    onOptionsPress?.();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.image} />
          ) : (
            <Icon name="image" size={24} color="#666" />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
      {showOptions && (
        <Pressable
          style={styles.optionsButton}
          onPress={handleOptionsPress}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="more-vert" size={20} color="#666" />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  optionsButton: {
    padding: 8,
  },
});
