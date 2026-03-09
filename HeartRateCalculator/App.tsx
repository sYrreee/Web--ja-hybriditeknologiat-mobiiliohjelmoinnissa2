import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';

export default function App() {
 
  const [age, setAge] = useState<string>('');

  const ageAsNumber = parseFloat(age);
  const isValid = !isNaN(ageAsNumber) && ageAsNumber > 0;

  const lowerLimit = isValid ? (220 - ageAsNumber) * 0.65 : 0;
  const upperLimit = isValid ? (220 - ageAsNumber) * 0.85 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Heart Rate Limits Calculator</Text>
        
        <Text style={styles.label}>Enter your age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric" 
          value={age}
          onChangeText={text => setAge(text)}
        />

        {}
        <Text style={styles.result}>Lower limit: {lowerLimit.toFixed(2)} bpm</Text>
        <Text style={styles.result}>Upper limit: {upperLimit.toFixed(2)} bpm</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 25,
  },
  result: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: '500',
  },
});
