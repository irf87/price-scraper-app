import React from 'react';
import {View, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, Button} from 'react-native-paper';
import ModalBottomSheetForContent from '@design-system/molecules/modals/ModalBottomSheetForContent/ModalBottomSheetForContent';
import styles from './styles';

interface AboutProps {
  isVisible: boolean;
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({isVisible, onClose}) => {
  const {t} = useTranslation();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ModalBottomSheetForContent
      isVisible={isVisible}
      onClose={onClose}
      title={t('about.title')}
      height="medium">
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.appName}>
          {t('about.appName')}
        </Text>
        <Text variant="bodyLarge" style={styles.author}>
          {t('about.author')}
        </Text>
        <View style={styles.linksContainer}>
          <Button
            mode="contained"
            onPress={() => handleOpenLink('https://www.linkedin.com/in/irf87/')}
            style={styles.linkButton}>
            {t('about.linkedin')}
          </Button>
          <Button
            mode="contained"
            onPress={() => handleOpenLink('https://github.com/irf87')}
            style={styles.linkButton}>
            {t('about.github')}
          </Button>
        </View>
      </View>
    </ModalBottomSheetForContent>
  );
};

export default About;
