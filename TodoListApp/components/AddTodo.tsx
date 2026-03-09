import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

interface AddTodoProps {
  onAdd: (task: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim().length > 0) {
      onAdd(task);
      setTask(''); 
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity onPress={handleAdd}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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