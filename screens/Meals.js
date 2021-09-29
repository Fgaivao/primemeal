import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SectionList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ReactNativeVectorIcons} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import _ from 'lodash';
import groupBy from 'lodash/groupBy';

export default class Meals extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      meals: [],
      isLoading: true,
      current_user: {},
      user_meals: {results: []},
      meal_month: '',
      correct_date: '',
      isLoading: true,
      token: '',
      groupedMeals: [],
      current_meals: {},
      groupedMonths: [],
      groupedYears: [],
      groupedWeeks: [],
      grouped: [],
      groupedMeals: [],
      gr: {},
    };
  }

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem('current_user');
      let data = JSON.parse(userData);
      // Gravar info de utilizador no estado do current_user
      this.setState({current_user: data});
      //console.log("current_user", data);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  async componentDidMount() {
    //Alert.alert(JSON.stringify(current_user))

    this.setState({isLoading: true})
    const current_user = this.getToken();

    try {
      let userData = await AsyncStorage.getItem('current_user');
      var user = JSON.parse(userData);
      // Gravar info de utilizador no estado do current_user
      this.setState({current_user: user});
      //console.log(user);
      //Alert.alert(JSON.stringify(user))
      console.log(user.id);
      //this.setState(JSON.stringify(user))
      this.setState({token: user.token});
      console.log(this.state.token);
    } catch (error) {
      console.log('Something went wrong', error);
    }

    console.log(this.state.token);

    let response = await fetch('http://www.pmeal.org/api/meals', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + this.state.token,
      },
    });
    //console.log(response)
    let mealJson = await response.json();
    let meals = mealJson;
    //console.log(mealJson)
    //console.log("E isto?", meals)
    if (response.status == 200) {
      this.setState({meals: mealJson});
      //let current_user_meal = meal;
      console.log('meal', this.state.meals);
      //Alert.alert(JSON.stringify(current_user))
      var emptyArray = [];

      var years = this.state.meals.map((m) => {
        return (m.createdAtYear = moment(m.createdAtYear).format('YYYY'));
      });

      var months = this.state.meals.map((m) => {
        return (m.createdAt = moment(m.createdAt).format('MMMM'));
      });

      console.log('Months', months);

      var groupedYears = _.mapValues(_.groupBy(this.state.meals, 'createdAtYear'));

      this.setState({groupedYears: groupedYears});

      var groupedMonths = _.mapValues(_.groupBy(this.state.meals, 'createdAt'));

      this.setState({groupedMonths: groupedMonths});

      console.log(JSON.stringify(groupedMonths));

      var groupedWeeks = _.mapValues(groupedMonths, function (group, key) {
        return _.groupBy(group, 'week');
      });

      console.log(JSON.stringify(groupedWeeks));

      this.setState({groupedWeeks: groupedWeeks});
    } else {
      console.log('error');
    }
    this.setState({isLoading: false})
  }

  /*async getWeek(){
  var currentWeekMeals=this.state;
  var current_meals= this.state;
 // AsyncStorage.setItem('current_meals', JSON.stringify(gr))
  console.log("CURRENT MEALS", current_meals)
}
*/

  render() {
    let {meals} = this.state;

    let {meal_month} = this.state;

    let {current_month} = this.state;

    let {isLoading} = this.state;

    let {isHidden} = this.state;

    let {groupedMonths} = this.state;

    let {groupedYears} = this.state;

    let {groupedWeeks} = this.state;

    let {groupedMeals} = this.state;

    const {navigation} = this.props;

    let gr = [];

    let arr = [];

    for (let key in groupedYears){
      gr.push(
        <View>
        <Text style={styles.year}>{key}</Text>
        </View>
        )


    for (let key in groupedMonths) {
      gr.push(
        <View>
          <Text style={styles.month}>{key}</Text>
        </View>,
      );

      for (var weekNumber in groupedWeeks[key]) {
        console.log(groupedWeeks[key][weekNumber]);

        console.log(arr);
        gr.push(
          <SectionList
            sections={[
              {title: weekNumber, data: groupedWeeks[key][weekNumber]},
            ]}
            style={{marginBottom: 20}}
            renderItem={({item}) => (
              <Text style={{display: 'none'}}>{item.name}</Text>
            )}
            renderSectionHeader={({section}) => (
              <Text
                onPress={() => navigation.navigate('currentWeek', {section})}
                style={{
                  backgroundColor:
                    parseInt(section.title) % 2 == 0 ? '#f07872' : '#f8c146',
                  color: 'white',
                  marginBottom: 20,
                  fontSize: 20,
                  padding: 10,
                  borderRadius: 15,
                }}>
                {' '}
                semana {section.title}
              </Text>
            )}
          />,
        );
      }
    }
    }

    return (
      <SafeAreaView style={{flex: 1 }}>

      <ScrollView style={{flex: 1, padding: 24, backgroundColor: '#41a9e1'}}>
      {isLoading == true ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
        <TouchableOpacity style={styles.hamb}>
          <Icon
            name="navicon"
            color="white"
            size={25}
            onPress={() => navigation.toggleDrawer()}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Histórico</Text>

        {gr}
        </>
        )}
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  hamb: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 60,
    marginTop: 60,
    marginBottom: 50,
  },
  month: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  year: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
