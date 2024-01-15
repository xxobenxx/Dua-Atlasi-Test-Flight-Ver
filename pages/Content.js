import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { dataWithMeaning } from '../data/data_with_meaning';

const Content = () => {
  const [selectedSurahName, setSelectedSurahName] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);

  const surahNames = [...new Set(dataWithMeaning.map((verse) => verse.surah_name))];
  surahNames.sort((a, b) => a.localeCompare(b));

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
            <Text key={verse.id}>

              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                {verse.surah_id}
              </Text>

              {'\n\n'}
              {verse.verse}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nOkunuşu: '}</Text>
              {verse.transcription}

              <Text style={{ fontWeight: 'bold' }}>{'\n\nMeali        : '}</Text>
              {verse.translation.text}
            </Text>
          )
        )
        .reduce((acc, textElement) => acc.concat(textElement, '\n\n'), []);

      if (resultText.length > 0) {
        setSelectedTranslation(resultText);
      } else {
        setSelectedTranslation('Listeden Görüntülemek Istediğiniz Duayı Seçin');
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
          <Picker.Item key={surahName} label={surahName} value={surahName} />
        ))}
      </Picker>

      {selectedSurahName && (
        <ScrollView style={styles.resultsContainer}>
         
          <Text style={{ fontSize: 18 }}>{selectedTranslation || 'No verses available.'}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    margin: 8,
    
  },
});

export default Content;
