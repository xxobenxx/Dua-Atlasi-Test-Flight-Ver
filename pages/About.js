import React from 'react';
import {Text, View, StyleSheet, SafeAreaView,ImageBackground,} from 'react-native';


const About = () => {
  return (
    <SafeAreaView>

    
      <View style={styles.aboutText}>
      <ImageBackground
        source={require('../assets/bckground.jpg')} 
        style={styles.backgroundImage}
      ></ImageBackground>
<Text>© El Turco Services 2023. </Text>
<Text>T : +34 600 793 638 </Text>
<Text>@: kerken[at]gmail </Text>
<Text>L : 08019 Barcelona</Text>
</View>
    
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', 
  }, 

  aboutText: {
    padding: 10,
    flexDirection: 'column',
  textAlign: 'left',
      fontFamily: 'Cochin',
      fontSize: 20,
      fontWeight: 'bold',
    },
  }
);

export default About;