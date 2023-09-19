import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';

import db from '../lib/firebase';
import { getTodayTodos, getUpcomingTodos } from '../utils/helpers';
import useGetTodos from '../hooks/useGetTodos';
import TodoList from '../components/TodoList';
import NoData from '../components/NoData';
import theme from '../theme';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const [isHidden, setIsHidden] = React.useState(false);

  const [todayTodos, setTodayTodos] = React.useState();
  const [upcomingTodos, setUpcomingTodos] = React.useState();

  const navigation = useNavigation();

  const { todos: data, loading } = useGetTodos();

  React.useEffect(() => {
    setTodayTodos(getTodayTodos(data));
    setUpcomingTodos(getUpcomingTodos(data));
  }, [data]);

  const handleCheck = async (id, event) => {
    const todoDocRef = doc(db, 'todo', id);

    try {
      const found = data.find((item) => item.id === id);
      await updateDoc(todoDocRef, { ...found, is_completed: event });
    } catch (error) {
      alert('An unexpected error was ocurred. Try it again!');
    }
  };

  const handleShow = () => {
    isHidden
      ? setTodayTodos(getTodayTodos(data))
      : setTodayTodos(getTodayTodos(data).filter((item) => !item.isCompleted));
    setIsHidden(!isHidden);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
      <View style={styles.hiddenContainer}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleShow}>
          <Text style={styles.hiddeBtn}>
            {!isHidden ? 'Hide completed' : 'Show all'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          {todayTodos?.length > 0 ? (
            <TodoList data={todayTodos} onCheck={handleCheck} />
          ) : (
            <NoData />
          )}
        </>
      )}
      <Text style={styles.title}>Upcoming</Text>

      {loading ? (
        <Loading />
      ) : upcomingTodos?.length > 0 ? (
        <TodoList data={upcomingTodos} onCheck={handleCheck} />
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 170, height: 170 }}
            source={require('../assets/teamwork.png')}
          />
        </View>
      )}
      <View style={styles.addBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <AntDesign name="pluscircle" size={38} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  hiddenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hiddeBtn: {
    color: theme.colors.primary,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 24,
  },
  addBtn: {
    backgroundColor: theme.colors.primary,
    width: 34,
    height: 34,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnContainer: {
    flexDirection: 'row-reverse',
    bottom: 14,
    flex: 1,
    alignItems: 'flex-end',
  },
});
