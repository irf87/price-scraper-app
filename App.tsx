import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

import AppNavigation from '@navigations/AppNavigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AppNavigation />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
