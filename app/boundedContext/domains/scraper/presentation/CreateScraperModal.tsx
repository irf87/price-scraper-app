import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import Modal from '@design-system/molecules/modals/Modal/Modal';
import FormScraper, {FormScraperRef} from './FormScraper';

interface CreateScraperModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const CreateScraperModal: React.FC<CreateScraperModalProps> = ({
  visible,
  onDismiss,
}) => {
  const {t} = useTranslation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const formRef = useRef<FormScraperRef>(null);

  const handleCreate = async () => {
    formRef.current?.submit();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      title={t('scrapedProducts.form.createScraper')}
      footerButtons={
        <View style={{marginTop: 16, flexDirection: 'row', gap: 8}}>
          <Button mode="outlined" onPress={onDismiss}>
            {t('common.cancel')}
          </Button>
          <Button
            loading={isCreating}
            disabled={!isFormValid || isCreating}
            mode="contained"
            onPress={handleCreate}>
            {t('scrapedProducts.form.createScraper')}
          </Button>
        </View>
      }>
      <FormScraper
        ref={formRef}
        onDismissMoal={onDismiss}
        onFormStateChange={setIsFormValid}
        setIsCreating={setIsCreating}
      />
    </Modal>
  );
};

export default CreateScraperModal;
