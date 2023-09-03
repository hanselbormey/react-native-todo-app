import React from 'react';
import { Alert, FlatList } from 'react-native';

import { doc, deleteDoc } from 'firebase/firestore';

import TodoItem from './TodoItem';
import db from '../lib/firebase';

export default function TodoList({ data, onCheck }) {
  const handleLongPress = (id) => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const todoDocRef = doc(db, 'todo', id);
          try {
            await deleteDoc(todoDocRef);
          } catch (error) {
            alert('An error ocurred. Please, try again!');
          }
        },
      },
    ]);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          {...item}
          onCheck={onCheck}
          onLongPressTodo={handleLongPress}
        />
      )}
    />
  );
}
