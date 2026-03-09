import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TodoItemProps {
  todo: { id: string; task: string; done: boolean };
  onToggle: (id: string) => void;
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.item}>
      <Text style={[
        styles.text, 
        todo.done && styles.doneText // Lisätään yliviivaus jos done on true
      ]}>
        {todo.task}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 18,
  },
  doneText: {
    textDecorationLine: 'line-through', 
    color: '#888',
  },
});