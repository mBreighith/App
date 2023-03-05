import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import Navigator from './Navigator';
import {AppProvider} from './src/AppProvider';
import { ListProvider } from './src/context/listContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ListProvider>
            <NavigationContainer>
              <StatusBar barStyle="light-content" />
              <Navigator />
            </NavigationContainer>
          </ListProvider>
        </AppProvider>
      </QueryClientProvider>
  )
}

export default App;
