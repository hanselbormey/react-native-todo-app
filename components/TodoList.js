import React from 'react';
import { FlatList, Text, View } from 'react-native';
import TodoItem from './TodoItem';

export default function TodoList({ data, onCheck }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem {...item} onCheck={onCheck} />}
    />
  );
}
