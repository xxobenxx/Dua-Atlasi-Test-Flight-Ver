import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TopTabsNavigator from './navigation/Navigator';
import {
  StyleSheet,
  // ImageBackground,
} from 'react-native';
import image from './assets/bckground.jpg';

const App = () => {
  return (
    
    <NavigationContainer style={{backgroundColor: 'transparent'}}>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <TopTabsNavigator />
{/* 
      <ImageBackground source={image}  
      style={styles.bckgrndImage}></ImageBackground> */}

    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
// bckgrndImage: {
//   flex: 1,
//   justifyContent: 'center',
//   resizeMode: 'auto', 
// }, 
// });

export default App;