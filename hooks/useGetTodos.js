import React from 'react';
import { collection, getDocs } from 'firebase/firestore';

import db from '../lib/firebase';

export default function useGetTodos() {
  const [todos, setTodos] = React.useState();

  React.useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'todo'));

      const arr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        isCompleted: doc.data().is_completed,
        date: doc.data().date.toDate(),
      }));

      setTodos(arr);
    }
    getData();
  }, []);

  return { todos };
}
