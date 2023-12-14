import * as React from 'react';
import { StatusBar } from 'expo-status-bar';  
import { NavigationContainer } from '@react-navigation/native';
import TopTabsNavigator from './navigation/Navigator';
import { View, StyleSheet, SafeAreaView } from 'react-native';


const App = () => {
  
  return (
    
  <NavigationContainer>
    <StatusBar barStyle="dark-content" />
    <TopTabsNavigator/>

   <SafeAreaView>
   
    
  
    <View/>
      
    </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 

});

export default App;