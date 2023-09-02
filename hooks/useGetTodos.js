import React from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import db from '../lib/firebase';

export default function useGetTodos() {
  const [todos, setTodos] = React.useState();

  /*   React.useEffect(() => {
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
  }, []); */

  React.useEffect(() => {
    const collectionRef = collection(db, 'todo');
    const q = query(collectionRef, orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot is a listener that listens to changes in the database in realtime
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          isCompleted: doc.data().is_completed,
          date: doc.data().date.toDate(),
        }))
      );
    });
    return unsubscribe; // unsubscribe from the listener when the component is unmounting
    // because it avoids memory leaks
  }, []);

  return { todos };
}
