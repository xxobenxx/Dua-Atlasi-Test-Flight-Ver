import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { StatusBar } from 'expo-status-bar';  

const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    
  };

  return (
    <SafeAreaView>
       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text  style={styles.header}>DUA GÖNDER</Text> 
    <View style={styles.container}>
      <SearchBar
        placeholder="Type here to search"
        onChangeText={handleSearch}
        value={searchText}
        lightTheme={true}
        round
        cancelIcon={true}
      />
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
  color:'blue',
  display:
  },


  container: {
    display:'flex',
    justifyContent:'center'
  },

});

export default App;