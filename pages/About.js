import React from 'react';
import {Text, View, StyleSheet, SafeAreaView,} from 'react-native';


const About = () => {
  return (
    <SafeAreaView>

    
      <View style={styles.aboutText}>
<Text>El Turco Services </Text>
<Text>All rights reserved 2023. </Text>
<Text>T : +34 600 793 638 </Text>
<Text>@: kerken[at]gmail </Text>
<Text>L : Foret 18, 08019 BCN</Text>
</View>
    
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

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