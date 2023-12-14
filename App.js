import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TopTabsNavigator from './navigation/Navigator';

const App = () => {
  return (
    <NavigationContainer>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TopTabsNavigator />

      
    </NavigationContainer>
  );
};

export default App;