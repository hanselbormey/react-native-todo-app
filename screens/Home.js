import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import TodoList from '../components/TodoList';
import theme from '../theme';
import { TODOS } from '../utils/mockData';
import { isToday } from '../utils/helpers';

export default function HomeScreen() {
  const [data, setData] = React.useState([]);
  const [isHidden, setIsHidden] = React.useState(false);

  const [todayTodos, setTodayTodos] = React.useState();
  const [upcomingTodos, setUpcomingTodos] = React.useState();

  const navigation = useNavigation();

  React.useEffect(() => {
    setData(TODOS);
  }, []);

  React.useEffect(() => {
    setTodayTodos(
      data
        ?.filter((item) => isToday(new Date(item.date)))
        .sort((a, b) => a.isCompleted - b.isCompleted)
    );
    setUpcomingTodos(
      data
        ?.filter((item) => !isToday(new Date(item.date)))
        .sort((a, b) => a.isCompleted - b.isCompleted)
    );
  }, [data]);

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

  const handleShow = () => {
    isHidden
      ? setData(TODOS)
      : setData(TODOS.filter((item) => !item.isCompleted));
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
      <TodoList data={todayTodos} onCheck={handleCheck} />
      <Text style={styles.title}>Upcoming</Text>
      <TodoList data={upcomingTodos} onCheck={handleCheck} />
      <TouchableOpacity
        style={styles.addBtnContainer}
        onPress={() => navigation.navigate('Add')}
      >
        <AntDesign name="pluscircle" size={38} color="black" />
      </TouchableOpacity>
      <StatusBar style="auto" />
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
  },
});
