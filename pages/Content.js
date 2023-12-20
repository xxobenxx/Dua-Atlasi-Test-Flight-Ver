import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { dataWithMeaning } from '../data/data_with_meaning';

const Content = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);


  const surahs = dataWithMeaning.reduce((acc,curr)=>{
if(!acc.includes(curr.surah_id)) {
acc.push(curr.surah_id)
}
return acc;
  },[])
  const totalSurahs = surahs.length;

    const verses = dataWithMeaning.filter(verse=>{
      return verse.surah_id == selectedSurah;
    })




  const handleSurahChange = (value) => {
    setSelectedSurah(value);
    setSelectedVerse(null); 
    console.log('Selected Surah:', value);
  };

  const handleVerseChange = (value) => {
    setSelectedVerse(value);
    console.log('Selected Verse:', value);  
  };


 
  React.useEffect(() => {
    if (selectedSurah !== null && selectedVerse !== null) {
      let selectedVerseData = dataWithMeaning.find(
        (verse) => {
          console.log('Verse Data:', verse.surah_id, verse.verse_number);
          return verse.surah_id == selectedSurah && verse.verse_number == selectedVerse;
        }
      );
      console.log('selectedVerseData', selectedVerseData);

      if (selectedVerseData) {
        setSelectedTranslation(selectedVerseData.translation.text);
      } else {
        setSelectedTranslation("Translation not available");
      }
    } else {
      setSelectedTranslation(null);
    }
  }, [selectedSurah, selectedVerse]);

  

  return (
    <View>
      <Text>Total Surahs: {totalSurahs}</Text>

      <Picker
        selectedValue={selectedSurah}
        onValueChange={(value) => handleSurahChange(value)}
      >
      
        <Picker.Item label="Select Surah" value={null} />
        {surahs.map((surah) => (
          <Picker.Item key={surah} label={`Surah ${surah}`} value={surah} />
        ))}
      </Picker>

      {selectedSurah && (
        <View>
          <Text>Selected Surah: {selectedSurah}</Text>

          <Picker
            selectedValue={selectedVerse}
            onValueChange={(value) => handleVerseChange(value)}
          >
            <Picker.Item label="Select Verse" value={null} />
            {verses.map((verse) => (
          <Picker.Item key={verse.verse_number} label={`Verse ${verse.verse_number}`} value={verse.verse_number} />
        ))}
          </Picker>

          {selectedVerse && (
            <View>
              <Text>Translation</Text>
              <Text>{selectedTranslation || "Translation not available"}</Text>

            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Content;