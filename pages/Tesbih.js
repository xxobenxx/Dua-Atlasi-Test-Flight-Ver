import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tesbih = () => {
  const [count, setCount] = useState(0);

  const reset = () => {
    setCount(0);
  };

  const specialValues = [12, 23, 34, 45, 56, 67, 78, 89];
  const isSpecialValue = specialValues.includes(count);

  const handleTextPress = () => {
    if (count < 99) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTextPress}>
        <Text style={[styles.tnum, { color: isSpecialValue ? 'orange' : 'black' }]}>
          {count}
        </Text>
      </TouchableOpacity>
      <View style={styles.btnwrap}>
        <TouchableOpacity style={styles.rbtn} onPress={reset}>
          <Text style={{ color: '#fffb', fontSize: 22 }}>SAYACI SIFIRLA</Text>
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