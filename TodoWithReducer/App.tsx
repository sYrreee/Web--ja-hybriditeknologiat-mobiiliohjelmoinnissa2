import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const [text, setText] = useState('');
 
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos(); //

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={text} 
          onChangeText={setText} 
          placeholder="Add a new task" 
        />
        <Button title="Add" onPress={handleAdd} color="#2ecc71" />
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.todoItem}>
            <Text style={[
              styles.todoText,
              item.done && styles.todoDoneText 
            ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  inputContainer: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', marginBottom: 10, alignItems: 'center' },
  input: { flex: 1, borderBottomWidth: 1, borderColor: '#ddd', marginRight: 10, padding: 5, fontSize: 18 },
  todoItem: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  todoText: { fontSize: 18 },
 
  todoDoneText: {
    textDecorationLine: 'line-through', 
    color: '#888', 
  },
});
