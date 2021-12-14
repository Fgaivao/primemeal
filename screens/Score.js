'use strict';

import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {ProgressChart} from 'react-native-chart-kit';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Pressable,
  Picker,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

var star = require('../estrela.png');

class Score extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      lastMeal: [],
      isLoading: true,
      calc: 0,
      meals: []
    };
  }

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem('current_user');
      let data = JSON.parse(userData);
      // Gravar info de utilizador no estado do current_user
      this.setState({current_user: data});
      console.log('current_user', data);
      this.setState({token: data.token});
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  async componentDidMount() {

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

      this.scoreCalc();
    }



  }



  scoreCalc(){

    const {meals} = this.state;
    this.setState({lastMeal: meals[meals.length - 1]});
    console.log("LAST MEAL", this.state.lastMeal);
    const {lastMeal} = this.state;

    this.setState({isLoading: true})
    this.setState({calc: lastMeal.healthyscore * 0.01});
    this.setState({isLoading: false})


  }


  render() {
    const {lastMeal} = this.state;
    const {isLoading} = this.state;
    const {calc} = this.state;
    const data = {
      labels: ['Score'], // optional
      data: [this.state.calc],
    };

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
      backgroundColor: 'transparent',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(237, 72, 58, ${opacity})`,
      strokeWidth: 1, // optional, default 3
      useShadowColorFromDataset: false, // optional
    };

    const Star =
                lastMeal.healthyscore > 0 && lastMeal.healthyscore < 19 ?
                <View style={styles.stars}>
                <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                </View>

                : lastMeal.healthyscore > 19 && lastMeal.healthyscore < 39 ?

                  <View style={styles.stars}>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                  </View>


                : lastMeal.healthyscore > 39 && lastMeal.healthyscore < 59 ?

                  <View style={styles.stars}>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                  </View>

                : lastMeal.healthyscore > 59 && lastMeal.healthyscore < 79 ?

                  <View style={styles.stars}>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                  </View>

                  :

                  <View style={styles.stars}>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                    <Image
                    style={{height: 50, width: 50, marginBottom: 20}}
                    source={star}></Image>
                  </View>

      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#53b659',
        }}>

        <Text style={styles.pontuacao}>A tua pontuação</Text>
          <SafeAreaView style={styles.addmeal}
        >


            {isLoading == true ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <>
          <View style={styles.chart}>
            <ProgressChart
              data={data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={80}
              chartConfig={chartConfig}
              hideLegend={true}
            />

            <Text style={styles.score}>{lastMeal.healthyscore}</Text>
            </View>


             {Star}


             <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.confirm}>
              <Text style={styles.buttonText}>confirmar</Text>
            </TouchableOpacity>

            </>
            )}
          </SafeAreaView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  stars:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chart:{
    marginTop: 50
  },
  score:{
    textAlign: 'center',
    color: '#8ec67f',
    fontSize: 60
  },
  addmeal: {
    backgroundColor: 'white',
    flex: 1,
    width: 320,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',

  },
  pontuacao:{
    color: "white",
    fontSize: 30,
    textAlign:'center',
    marginTop: 100,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  confirm: {
    backgroundColor: '#42aae1',
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
  }
});

export default Score;
