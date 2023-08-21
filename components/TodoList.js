import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { TODOS } from '../utils/mockData';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [data, setData] = React.useState(TODOS);

  const handleCheck = (id, event) => {
    const todos = data.map((item) => {
      if (item.id === id) {
        item.isCompleted = event;
        return item;
      }
      return item;
    });

    setData(todos);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TodoItem {...item} onCheck={handleCheck} />}
    />
  );
}
