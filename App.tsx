import React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {I18nextProvider} from 'react-i18next';
import {Provider as PaperProvider} from 'react-native-paper';

import AppNavigation from '@navigation/AppNavigation';
import {i18n} from './app/core/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  useEffect(() => {
    // Asegurarse de que i18n esté inicializado
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <PaperProvider>
          <QueryClientProvider client={queryClient}>
            <AppNavigation />
          </QueryClientProvider>
        </PaperProvider>
      </NavigationContainer>
    </I18nextProvider>
  );
}
