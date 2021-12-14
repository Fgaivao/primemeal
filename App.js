import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import Registration from './screens/Registration';
import Meals from './screens/Meals';
import NewMeal from './screens/NewMeal';
import currentWeek from './screens/currentWeek';
import currentWeekMeals from './screens/currentWeekMeals';
import VegetarianMeals from './screens/VegetarianMeals';
import Instructions from './screens/Instructions';
import Score from './screens/Score';
import dayMeal from './screens/dayMeal';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
    headerShown: false
  }}
    >

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Instruções" component={Instructions} />
      <Stack.Screen name="Home" component={Profile} />
      <Stack.Screen name="Sign Up" component={Registration} />
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="Adicionar Refeição" component={NewMeal} />
      <Stack.Screen name="currentWeek" component={currentWeek} />
      <Stack.Screen name="currentWeekMeals" component={currentWeekMeals} />
      <Drawer.Screen name="Refeições Vegetarianas" component={VegetarianMeals} />
      <Drawer.Screen name="Score" component={Score} />
      <Drawer.Screen name="dayMeal" component={dayMeal} />


    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}



const Drawer = createDrawerNavigator();



function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>


      <Drawer.Screen name="Login" component={MyStack} />
      <Drawer.Screen name="Home" component={Profile} />
      <Drawer.Screen name="Instruções" component={Instructions} />
      {/*<Drawer.Screen name="Sign Up" component={Registration} />*/}

      {/* <Drawer.Screen name="Meals" component={Meals} />*/}
       <Drawer.Screen name="Adicionar Refeição" component={NewMeal} />
      {/* <Drawer.Screen name="currentWeek" component={currentWeek} />*/}
      {/* <Drawer.Screen name="currentWeekMeals" component={currentWeekMeals} />
       <Drawer.Screen name="Refeições Vegetarianas" component={VegetarianMeals} />*/}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>

  );
}
