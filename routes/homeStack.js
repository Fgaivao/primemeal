import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';
import Profile from '../screens/Profile';
import Meals from '../screens/Meals';
import NewMeal from '../screens/NewMeal';
import currentWeek from '../screens/currentWeek';
import currentWeekMeals from '../screens/currentWeekMeals';
import VegetarianMeals from '../screens/VegetarianMeals';
import pieChart from '../screens/pieChart';
import Score from '../screens/Score';



const screens = {



  Login: {
  screen: LoginScreen
},

Registration: {
  screen: Registration
},

Profile: {
  screen: Profile
},
Meals: {
  screen: Meals
},
NewMeal: {
  screen: NewMeal
},
pieChart: {
  screen: pieChart
},
currentWeek: {
  screen: currentWeek
},
currentWeekMeals: {
  screen: currentWeekMeals
},
VegetarianMeals: {
  screen: VegetarianMeals
},
Score: {
  screen: Score
}


}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
