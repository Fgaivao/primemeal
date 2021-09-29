import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Image,
  DevSettings,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ReactNativeVectorIcons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from '../screens/LoginScreen';
import moment from 'moment';
var token = 'token';
var meals = [];
var home = require('../home.png');
var score = require('../score.png');
var estrelas = require('../estrelas.png');
var veggie = require('../morango.png');

export default class Profile extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  // Estado de current_user
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      current_user: {},
      day: '',
      token: '',
      vegetarian_meals: '',
      isLoading: false,
      asyncData: {},
      lastMealScore: 0
    };
  }

  // Buscar user gravado em Async Storage
  /* async getToken(user) {
    this.setState({isLoading: true})
    try {
      let userData = await AsyncStorage.getItem("current_user");
      let data = JSON.parse(userData);
// Gravar info de utilizador no estado do current_user
      this.setState({current_user: data})
      console.log("current_user", data);
      this.setState({isLoading: false})
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  */

  async _getUser(){

  }


  // Verificação de utilizador
/* async getShitDone() {
  this.setState({isLoading: true})
    console.log("component did mount")

   try {
      var user = JSON.parse(await AsyncStorage.getItem('current_user'));
      this.setState({current_user: user});
      this.setState({token: user.token});
    } catch (error) {
      console.log('Something went wrong', error);
    }

    console.log(JSON.stringify(this.state.token));

    try {
      const response = await fetch('http://www.pmeal.org/api/meals', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.state.token,
        },
      });

      const json = await response.json();

      this.setState({meals: json});
    } catch (error) {
      console.log(error);
    }
    console.log('WIU', this.state.current_user);
    this.vegetarianMeals();
    this.setState({isLoading: false})
  }
*/




async getStuff(){
  var user = JSON.parse(await AsyncStorage.getItem('current_user'));
    this.setState({current_user: user})
    console.log('profile', this.state.current_user)
    this.setState({token: this.state.current_user.token})


    try {
      const response = await fetch('http://www.pmeal.org/api/meals', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.state.token,
        },
      });

      const json = await response.json();

      this.setState({meals: json});
    } catch (error) {
      console.log(error);
    }
    console.log('WIU', this.state.current_user);
   // this.vegetarianMeals();
    this.setState({isLoading: false})
}

 async componentDidMount(){

  this.setState({isLoading: true})
  var user = JSON.parse(await AsyncStorage.getItem('current_user'));
    this.setState({current_user: user})
    console.log('profile', this.state.current_user)
    this.setState({token: this.state.current_user.token})


    try {
      const response = await fetch('http://www.pmeal.org/api/meals', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.state.token,
        },
      });

      const json = await response.json();

      this.setState({meals: json});
    } catch (error) {
      console.log(error);
    }
    console.log('WIU', this.state.current_user);
    this.vegetarianMeals();
    this.setState({isLoading: false})
    this.lastDayHealth();

  }

vegetarianMeals() {
    this.setState({
      vegetarian_meals: this.state.meals.filter(
        (meal) => meal.vegetarian == true,
      ),
    });

  }

  lastDayHealth(){
    const lastMeal = this.state.meals[this.state.meals.length - 1];
    const showLastHealthScore = lastMeal.healthyscore;

    this.setState({lastMealScore: showLastHealthScore})
    console.log("Last health Meal", this.state.lastMealScore);


  }



 async _userLogout() {
    try {
    await AsyncStorage.clear()

    this.props.navigation.navigate('Login')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}



  render() {
    const {navigation} = this.props;
    let {current_user} = this.state;
    let {vegetarian_meals} = this.state;
    let {isLoading} = this.state;
    var date = new Date();
    var week = new Date().getDay();
    var year = new Date().getFullYear();
    let {meals} = this.state;
    let number_meals = meals.length;
    let {lastMealScore} = this.state;





    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#8EC67F',
        }}>

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
            <Text style={styles.adiciona}>Adiciona a tua refeição</Text>

            <TouchableOpacity
              style={styles.addjantar}
              color="#C1DABD"
              onPress={() => navigation.navigate("Adicionar Refeição")}>
              <Text style={{color: '#909C90', fontSize: 20}}>
                + adicionar jantar
              </Text>
            </TouchableOpacity>

            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.homemeals}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Meals')}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  home cook
                </Text>
                <Text style={{color: 'white', fontSize: 30, paddingLeft: 10}}>
                  {number_meals}
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={home}></Image>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.healthyscore}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Score')}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  healthy score
                </Text>
                <Text style={{color: 'white', fontSize: 30, paddingLeft: 10}}>
                  {lastMealScore}%
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={score}></Image>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.estrelas}
                color="#ED4838"
                onPress={() => navigation.navigate('Meals')}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  estrelas de refeição
                </Text>
                <Text style={{color: 'white', fontSize: 30, paddingLeft: 10}}>
                  {Math.ceil(lastMealScore/20)}
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={estrelas}></Image>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.veggie}
                color="#ED4838"
                onPress={() => navigation.navigate('Refeições Vegetarianas', {vegetarian_meals})}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  veggie meals
                </Text>
                <Text style={{color: 'white', fontSize: 30, paddingLeft: 10}}>
                  {Math.ceil((vegetarian_meals.length * 100) / meals.length)}%
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={veggie}></Image>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Button title="Logout" onPress={this._userLogout.bind(this)} />
            </View>


          </>
        )}

      <View style={styles.footer}>
        <FlatList
              data={meals.slice(Math.max(meals.length - 5, 0))}
              numColumns={5}
              style={{textAlign:'center'}}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('currentWeekMeals', {item})}>
                  <Text style={styles.data}>{moment(item.updatedAt).format('ddd')}{'\n'}
                                            {moment(item.updatedAt).format('DD')}
                  </Text>
                </TouchableOpacity>

              )}
              keyExtractor={(item, index) => index.toString()}
            />



      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hamb: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  addjantar: {
    backgroundColor: '#e6e7e9',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: 300,
  },
  homemeals: {
    backgroundColor: '#ED4838',
    width: 150,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  healthyscore: {
    backgroundColor: '#53b659',
    width: 150,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  estrelas: {
    backgroundColor: '#f8c145',
    width: 150,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  veggie: {
    backgroundColor: '#41a9e1',
    width: 150,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  adiciona: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 60,
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  login: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  btnview: {
    paddingTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  contacts: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
  contact: {
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent:'center'
  },
  data: {
    backgroundColor: '#E6E7E9',
    color: '#8c8c8f',
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  datacurrent: {
    backgroundColor: '#B691C2',
    color: 'white',
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
