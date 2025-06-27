import React from 'react';
import useLoaderStore from './useLoader';
import {ActivityIndicator, View} from 'react-native';

const GlobalLoader = () => {
  const isLoading = useLoaderStore(state => state.isLoading);
  if (!isLoading) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 24,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </View>
  );
};

export default GlobalLoader;
