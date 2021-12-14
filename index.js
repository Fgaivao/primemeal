/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },


  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,


  requestPermissions: true,
});



AppRegistry.registerComponent(appName, () => App);
