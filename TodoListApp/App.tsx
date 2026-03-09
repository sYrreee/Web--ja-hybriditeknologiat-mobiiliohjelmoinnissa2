import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './components/TodoItem';

interface Todo {
  id: string;
  task: string;
  done: boolean;
}

const STORAGE_KEY = '@todo_list_data';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    loadTodos();
  }, []);

  
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const loadTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) setTodos(JSON.parse(jsonValue));
    } catch (e) {
      console.error("Virhe ladattaessa", e);
    }
  };

  const saveTodos = async (todoItems: Todo[]) => {
    try {
      const jsonValue = JSON.stringify(todoItems);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Virhe tallennettaessa", e);
    }
  };

  const addTodo = () => {
    if (task.trim().length > 0) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        task: task,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setTask(''); 
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    );
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTodo}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    fontSize: 18,
    padding: 5
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});