import React, {useState, useCallback} from 'react';
import {View, Image, Text as RNText} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import ModalBottomSheetForText from '@design-system/molecules/modals/ModalBottomSheetForText/ModalBottomSheetForText';
import {styles} from './styles';

interface Props {
  imageUrl?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const ItemSectionWrapper = ({
  children,
  imageUrl,
  title,
  description,
}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  const handleTextLayout = useCallback((event: any) => {
    const {lines} = event.nativeEvent;
    setIsTextTruncated(lines.length > 10);
  }, []);

  return (
    <View style={styles.container}>
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </View>
      )}

      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>

      {description && (
        <>
          <RNText
            style={styles.description}
            numberOfLines={5}
            ellipsizeMode="tail"
            onTextLayout={handleTextLayout}>
            {description}
          </RNText>
          {isTextTruncated && (
            <Button
              mode="text"
              onPress={() => setIsDescriptionModalVisible(true)}
              style={styles.readMoreButton}>
              {t('common.readMore')}
            </Button>
          )}
        </>
      )}
      {children}

      <ModalBottomSheetForText
        isVisible={isDescriptionModalVisible}
        onClose={() => setIsDescriptionModalVisible(false)}
        text={description || ''}
        title={title}
        handleColor={theme.colors.primary}
      />
    </View>
  );
};

export default ItemSectionWrapper;
