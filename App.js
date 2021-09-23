import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

notifee.onForegroundEvent(({detail}) => {
  if (detail.pressAction) {
    console.log(detail.pressAction.id);
    notifee.cancelAllNotifications();
    notifee.cancelDisplayedNotifications();
  }
});

export default function App() {
  const showNotification = () => {
    notifee.displayNotification({
      title: 'title',
      body: 'body',
      android: {
        importance: AndroidImportance.HIGH,
        channelId: 'test',
        actions: [
          {
            title: 'First',
            pressAction: {
              id: 'first',
            },
          },
          {
            title: 'Second',
            pressAction: {
              id: 'second',
            },
          },
          {
            title: 'Third',
            pressAction: {
              id: 'third',
            },
          },
        ],
      },
    });
    notifee.cancelAllNotifications();
  };

  useEffect(() => {
    notifee.createChannel({
      id: 'test',
      name: 'Testing',
      importance: AndroidImportance.HIGH,
    });
  }, []);

  return (
    <>
      <View>
        <TouchableWithoutFeedback onPress={showNotification}>
          <View style={{width: '100%', height: 400, backgroundColor: '#f00'}} />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
