import React from 'react';
import { Platform, View } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import AddTodoForm from '../components/AddTodoForm';
import db from '../lib/firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function AddTodo() {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleAdd = async (todo) => {
    const docRef = await addDoc(collection(db, 'todo'), todo);
    schedulePushNotification(todo);
    navigation.goBack();
  };

  const schedulePushNotification = async (todo) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Todo app',
          body: todo.text,
        },
        trigger: todo.date,
      });
    } catch (error) {
      alert(
        'The notification failed to schedule, make sure the date is valid.'
      );
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
      <AddTodoForm onSubmit={handleAdd} />
    </View>
  );
}
