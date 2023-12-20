import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { set } from 'react-native-clipboard';

const Tesbih = () => {
  const [count, setCount] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);


  const reset = () => {
    setCount(0);
  };

  const handleTextPress = () => {
    if (count < 34) {
      setCount(count + 1);
    } else {
      setCount(0);
      setResetCounter(resetCounter + 1);
    }
  };

  const getDisplayText = () => {
    if (count === 34) {
      return 'N';
    }
    return count;
  };

  return (
    <View style={styles.container}>
      
      <Text style={{ marginTop: 20, fontSize: 30, fontWeight: 'bold' }}>
        {resetCounter} TUR</Text>


      <TouchableOpacity onPress={handleTextPress}>
        <Text style={[styles.tnum, { color: count === 34  ? 'gold' : 'black' }]}>
          {getDisplayText()}
        </Text>
      </TouchableOpacity>


      <View style={styles.btnwrap}>
        <TouchableOpacity style={styles.rbtn} onPress={reset}>
          <Text style={{ color: 'gold', fontSize: 22 }}>TESBİHİ SIFIRLA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tnum: {
    borderWidth: 5,
    borderColor: '#7cf246',
    padding: 110,
    borderRadius: 63,
    fontSize: 60,
  },
  btnwrap: {
    marginTop: 20,
  },
  rbtn: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'black',
    margin: 10,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.19)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 33,
    elevation: 3,
  },
});

export default Tesbih;