import React from 'react';
import { View } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import AddTodoForm from '../components/AddTodoForm';
import db from '../lib/firebase';

export default function AddTodo() {
  const navigation = useNavigation();

  const handleAdd = async (todo) => {
    const docRef = await addDoc(collection(db, 'todo'), todo);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
      <AddTodoForm onSubmit={handleAdd} />
    </View>
  );
}
