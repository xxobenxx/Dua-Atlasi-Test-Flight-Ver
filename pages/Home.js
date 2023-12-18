import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { Audio } from 'expo-av';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [matchingVerses, setMatchingVerses] = useState([]);

  const handleChange = (text) => setKeyword(text);

  const handleSubmit = async() => {
    try {
      // const res = await axios.get("https://api.acikkuran.com/surahs")
      // console.log(res);
      let DATA = []
       for(let i = 1; i < 3; i++) {
        console.log("syrah count",i);
        const apiUrl = `https://api.acikkuran.com/surah/${i}?author=8`;
        const res = await axios.get(apiUrl);
        for(let j = 0 ; j < res.data.data.verses.length; j++) {
let verseObj = {...res.data.data.verses[j], surah_audio:res.data.data.audio.mp3}
          DATA.push(verseObj);
}}
DATA.length = 5
console.log(DATA);
      //   }
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    // handleSearch();
    // Keyboard.dismiss();
  };

  const handleSearch = async () => {
    const keyword = keyword.trim();

    try {
 
      console.log("api res",res);
      const { data } = res.data;

      const foundVerses = findVersesWithKeyword(data, keyword);

      console.log('foundVerses:', foundVerses);

      if (foundVerses.length > 0) {
        setMatchingVerses(foundVerses);
      } else {
        setMatchingVerses(['ilgili dua bulunamadı']);
      }

      setIsReady(true);
      setError('');
    } catch (error) {
      setError(error.message);
      setIsReady(true);
    } finally {
      setLoading(false);
    }
  };

  // const findVersesWithKeyword = (data, keyword) => {
  //   const lowerCaseKeyword = keyword.toLowerCase();
  //   return data.verses.filter((verse) =>
  //     verse.translation.text.toLowerCase().includes(lowerCaseKeyword)
  //   );
  // };

  return (
    <SafeAreaView>
      <Text style={styles.header}>SEARCH AND SEND</Text>
      <View style={styles.container}>
        <SearchBar
          placeholder="Aradığınız kelime"
          onChangeText={handleChange}
          value={keyword}
          lightTheme={true}
          round
          cancelIcon={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Dua Bul / Find</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.resultsContainer}>
          {matchingVerses.map((verse, index) => (
            <View key={index} style={styles.verseContainer}>
              <Text style={styles.verseText}>
                Sure: {verse.verse}
              </Text>
              {verse.translation && verse.translation.text ? (
                <Text style={styles.verseText}>
                  Anlamı: {verse.translation.text}
                </Text>
              ) : (
                <Text style={styles.verseText}>Aradığınız kelime bulunamadı</Text>
              )}
              <Button onPress={playSound} title="Play Sound" />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {},
  results: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    backgroundColor: '#208796',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gold',
  },
  verseContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  verseText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Home;