import React from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import db from '../lib/firebase';

export default function useGetTodos() {
  const [todos, setTodos] = React.useState();
  const [loading, setLoading] = React.useState(false);

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

  //   orderBy('created_at', 'desc')

  React.useEffect(() => {
    setLoading(true);
    try {
      const collectionRef = collection(db, 'todo');
      const q = query(collectionRef, where('date', '>=', new Date()));

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
        setLoading(false);
      });
      return unsubscribe; // unsubscribe from the listener when the component is unmounting
      // because it avoids memory leaks
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return { todos, loading };
}
