import React from 'react';
import {Animated, ColorValue, SafeAreaView} from 'react-native';

import NavigationHeader from '@design-system/atoms/navigation/navigationHeader/NavigationHeader';
import SnackbarInternal from '@components/SnackbarInternal/SnackbarInternal';
import GlobalLoader from '@components/Loader/GlobalLoader';

import SearchInputSection from './SearchInputSection';

import styles from './styles';

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  onToggleDrawer?: () => void;
  spin?: Animated.AnimatedInterpolation<string | number>;
  backgroundColor?: ColorValue;
  hasLoader?: boolean;
}

const ScreenLayout = ({
  children,
  showHeader = true,
  headerTitle,
  onToggleDrawer,
  spin,
  backgroundColor = '#fff',
  hasLoader = true,
}: Props) => {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      {hasLoader && <GlobalLoader />}
      {showHeader && spin && (
        <NavigationHeader
          title={headerTitle || ''}
          toggleDrawer={onToggleDrawer || (() => {})}
          spin={spin}
        />
      )}
      {children}
      <SnackbarInternal />
    </SafeAreaView>
  );
};

ScreenLayout.SearchSection = SearchInputSection;

export default ScreenLayout;
