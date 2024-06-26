import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';


const Tesbih = () => {
  const [count, setCount] = useState('۞');
  const [resetCounter, setResetCounter] = useState(1);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const fontSizeThreshold = 600; 

    if (screenWidth >= fontSizeThreshold) {
      setFontSize(25); 
    } else {
      setFontSize(14);
    }
  }, []);


  const reset = () => {
    setCount(0);
    setResetCounter(1);
    
  };

  const handleTextPress = () => {
    if (count < 34) {
      setCount(count + 1);
    } else {
      setCount(1);
      setResetCounter(resetCounter + 1);
    }
  };

  const getDisplayText = () => {
    if (count === 34) {
      return '۞';
    }
    return count;f
  };

  return (
  <SafeAreaView style={{ backgroundColor: 'transparent', flex: 1 }}>
      
  <View style={styles.container}>

      <Text style={{ margin:5}} >

      <Text style={{ color: 'black', fontSize: fontSize, fontWeight: 'bold', textAlign: 'center' }}>
      "Allahu la ilahe illa huvel hayyul kayyum, la te'huzuhu sinetun ve la nevm, lehu ma fis semavati ve ma fil ard, 
      menzellezi yeşfeu indehu illa bi iznih ya'lemu ma beyne eydihim ve ma halfehum, ve la yuhitune bi şey'in min 
      ilmihi illa bi ma şae, vesia kursiyyuhus semavati vel ard, ve la yeuduhu hıfzuhuma ve huvel aliyyul azim."
      </Text>{'\n'}
    
      <Text style={{ color: 'black', fontSize: 15,  textAlign: 'center' }}>
      Ayete’l-kürsî (Bakara 2-255)</Text>

      </Text>

    <View style={styles.counter}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        {resetCounter}. TUR</Text>


      <TouchableOpacity onPress={handleTextPress}>
        <Text style={[styles.tnum, { color: count === 34  ? 'gold' : 'black' }]}>
          {getDisplayText()}
        </Text>
      </TouchableOpacity>


      <View style={styles.btnwrap}>
        <TouchableOpacity style={styles.rbtn} onPress={reset}>
          <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>TESBİHİ SIFIRLA</Text>
        </TouchableOpacity>
      </View>

    </View>
  </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    margin: 3,
  },
  counter:{ flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  
  tnum: {
    borderWidth: 5,
    borderColor: '#208796',
    padding: 100,
    borderRadius: 63,
    fontSize: 60,
  },
  btnwrap: {
    marginTop: 10,
  },
  rbtn: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'orange',
    margin: 10,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.19)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 33,
    elevation: 3,
  },

  
});

export default Tesbih;