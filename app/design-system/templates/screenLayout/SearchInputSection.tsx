import React from 'react';
import {View} from 'react-native';
import SearchInput from '@design-system/atoms/inputs/SearchInput';

import styles from './styles';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}

function SearchInputSection({searchTerm, setSearchTerm, placeholder}: Props) {
  return (
    <View style={styles.searchContainer}>
      <SearchInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={placeholder}
      />
    </View>
  );
}

export default SearchInputSection;
