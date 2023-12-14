import * as React from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';



const Home = () => {
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = (text) => {
      setSearchText(text);
    };
  
    
  
    return (
    
      
  
      <SafeAreaView>
      
     
         
        <Text  style={styles.header}>SEARCH AND SEND</Text> 
        
  
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
      color: 'black',
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
  
  
    container: {},
  
  });
  
  export default Home;