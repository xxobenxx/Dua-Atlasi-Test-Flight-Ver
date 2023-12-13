import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import React, {useState} from 'react';


export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;


  return (
    <SafeAreaView>

    <View style={styles.header}>
      <Text style={{color:'red',fontSize:30 }}>DUA GÖNDER</Text>
      
      <StatusBar style="auto" />
      </View>

    <SearchBar
        placeholder="Aradığınız dua / kelime"
        onChangeText={this.updateSearch}
        value={search}
        lightTheme={true}s
        clearIcon={true}
      />
      
    </SafeAreaView>
  );


};
}

const styles = StyleSheet.create({

  header: {  
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});
