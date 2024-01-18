import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { dataWithMeaning } from '../data/data_with_meaning';

const Content = () => {
  const [selectedSurahName, setSelectedSurahName] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);

  const surahNames = [...new Set(dataWithMeaning.map((verse) => verse.surah_name))];
  surahNames.sort((a, b) => {
    const [aPrefix, aNumber] = a.split('-');
    const [bPrefix, bNumber] = b.split('-');

    if (aPrefix === bPrefix) {
      const aNumeric = parseInt(aNumber, 10) || 0;
      const bNumeric = parseInt(bNumber, 10) || 0;
      return aNumeric - bNumeric;
    }
    return a.localeCompare(b);
  });

  const verses = dataWithMeaning.filter((verse) => verse.surah_name === selectedSurahName);

  const handleSurahNameChange = (value) => {
    setSelectedSurahName(value);
    console.log('Selected Surah Name:', value);
  };

 

  React.useEffect(() => {
    if (selectedSurahName) {
      const resultText = verses
        .map(
          (verse) => (
            <View key={verse.id} style={{ borderBottomWidth: 1, borderBottomColor: '#208796', marginBottom: 6, alignItems:'center'} }>

              <Text>
             <Text style={{ fontWeight: 'bold', fontSize: 25}}>
                {verse.surah_name}
              </Text>{'\n'}

              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {verse.surah_id}
              </Text>
              
              <Text style={{fontSize: 16 }}>
              {'\n\n'}
              {verse.verse}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nOkunuşu: '}</Text>
              {verse.transcription}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nMeali        : '}</Text>
              {verse.translation.text}
              </Text>

            </Text>
            </View>  
          )
        )
        .reduce((acc, textElement) => acc.concat(textElement, '\n\n'), []);

              

            if (resultText.length > 0) {
              setSelectedTranslation(resultText);
            } else {
              setSelectedTranslation(`۞ Kılavuzda toplam ${surahNames.length} dua bulundu.`);
            }
          } else {
            setSelectedTranslation(null);
          }
        }, [selectedSurahName]);
        

          return (
            <View>
              <Picker
                selectedValue={selectedSurahName}
                onValueChange={(value) => handleSurahNameChange(value)}
                
              >
                <Picker.Item label="DUA KILAVUZU" value={null} />
                {surahNames.map((surahName) => (
                  <Picker.Item key={surahName} label={surahName} value={surahName}/>
                ))}
              </Picker>

              {selectedSurahName && (
                <ScrollView style={styles.resultsContainer}>
                
                  <Text style={{ fontSize: 18 }}>{selectedTranslation || 'Lütfen Bir Dua Seçin'}</Text>
                </ScrollView>
              )}
            </View>
          );
        };

const styles = StyleSheet.create({
  
  resultsContainer: {
   margin: 3,
   padding: 3,
   backgroundColor: '#b8a8b4',
   borderWidth: 2,
   borderColor: 'gray', 
   
  },
});

export default Content;
