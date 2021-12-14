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
  Modal
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ReactNativeVectorIcons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from '../screens/LoginScreen';
import moment from 'moment';
import PushNotification, {Importance} from "react-native-push-notification";
var token = 'token';
var meals = [];
var home = require('../home.png');
var score = require('../indice_primeal.png');
var estrelas = require('../estrelas.png');
var veggie = require('../morango.png');
var leguminosa = require('../leguminosa.png');
var legume = require('../legume.png');
var glicemico = require('../glicemico.png');
var chef = require('../chef.png');
var flexi = require('../flexi.png');
var planeta = require('../planeta.png');

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
      lastMealScore: 0,
      modalVisible: false,
      todays_meal: '',
      home_chef: false,
      guardiao_planeta: false,
      craque_flexitarianismo: false,
      craque_leguminosa: false,
      yesterdays_meal: '',
      asIndiceGlicemico: false,
      campeaoLegume: false,
      mestre_legume: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

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
    this.todaysMeal();
    this.homeChef();
    this.guardiaoPlaneta();
    this.yesterdaysMeal();
    this.campeaoLegume();
    this.mestreLegume();

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

  todaysMeal(){

    let today = (moment(Date.now()).format('MMMM Do YYYY'))



    const lastMeal = this.state.meals[this.state.meals.length - this.state.meals.length];

    console.log(today);



    (moment(lastMeal.createdAt).format('MMMM Do YYYY') === today) ? this.setState({todays_meal: lastMeal}) : null;

  }

  homeChef(){
    const home_chef = this.state.home_chef;
    const current_user = this.state.current_user;
    const todays_meal = this.state.todays_meal

    const calcChef = (parseInt(todays_meal.protperc) * parseInt(todays_meal.protconfection)) + (parseInt(todays_meal.hydperc) * parseInt(todays_meal.hydconfection)) + (parseInt(todays_meal.hortconfection) * parseInt(todays_meal.hortperc));

    console.log('HOMECHEF', calcChef)

    if(calcChef >= 75){
      this.setState({home_chef: true})
    }


  }

   guardiaoPlaneta(){
    const guardiao_planeta = this.state.guardiao_planeta;
    const current_user = this.state.current_user;
    const todays_meal = this.state.todays_meal

    const calcGuardiaoPlaneta = (parseInt(todays_meal.hydrates[0]) * parseInt(todays_meal.hydperc))/60;

    //console.log("WWWWWWWWWW", todays_meal.hydrates[0])

    console.log('Guadião', calcGuardiaoPlaneta)

    if(calcGuardiaoPlaneta >= 75){
      this.setState({guardiao_planeta: true})
    }


  }

  craqueFlexitarianismo(){
    const craque_flexitarianismo = this.state.craque_flexitarianismo;
    const current_user = this.state.current_user;
    const todays_meal = this.state.todays_meal

  if(todays_meal.proteins != "Carnes vermelhas (vaca, porco, borrego, cabrito)" && todays_meal.proteins != "Queijo, fiambre" && todays_meal.proteins != "Nenhum"){
    this.setState({craque_flexitarianismo: false})
  }
  else{
    this.setState({craque_flexitarianismo: true})
  }

  }

  campeaoLegume(){

    const todays_meal = this.state.todays_meal

    const calcLegume = (((parseInt(todays_meal.vegetables[0]) + parseInt(todays_meal.hortperc) + parseInt(todays_meal.hortconfection[0])) * 2.2)/30);

    console.log(todays_meal.vegetables[0], todays_meal.hortperc, todays_meal.hortconfection[0])

    console.log('Champ Legume', calcLegume)

    if(calcLegume >= 75){

    this.setState({campeaoLegume: true})

}

else{
  this.setState({campeaoLegume: false})
}

  }

  mestreLegume(){
    const todays_meal = this.state.todays_meal;
    const mestre = this.state.mestre_legume;

    if(todays_meal.hortconfection > 5){
      this.setState({mestre_legume:true})
    }
    else{
      this.setState({mestre_legume:false})
    }

  }

  craqueLeguminosa(){
    const craque_leguminosa = this.state.craque_leguminosa;
    const current_user = this.state.current_user;
    const todays_meal = this.state.todays_meal

  if(todays_meal.vegetables == "Cogumelos" || todays_meal.vegetables == "nenhuma"){
    this.setState({craque_leguminosa: false})
  }
  else{
    this.setState({craque_leguminosa: true})
  }

    console.log("WWWWWWWWWW", todays_meal.vegetables)

  }

  yesterdaysMeal(){
    const yesterdays_meal = this.state.yesterdays_meal;
    const yesterday = (moment().subtract(1, 'day').format('MMMM Do YYYY'))

   const yesterdaysMeal  = this.state.meals.map(meal =>{
      moment(meal.createdAt).format('MMMM Do YYYY') === yesterday
    })

    this.setState({yesterdays_meal: yesterdaysMeal})

    console.log(yesterday)
  }

  asIndiceGlicemico(){
    const todays_meal = this.state.todays_meal
    const asIndiceGlicemico = this.state.asIndiceGlicemico

    if(todays_meal.hydrates[1] == 'Leguminosas secas' || todays_meal.hydrates[1] =='Leguminosas verdes' || todays_meal.hydrates[1] == 'Quinoa'){
      this.setState({asIndiceGlicemico: true})
    }
    else{
      this.setState({asIndiceGlicemico: false})
    }
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
    let {modalVisible}=this.state;
    let {todays_meal}=this.state;
    let {home_chef}=this.state;
    let {craque_flexitarianismo}=this.state;
    let {craque_leguminosa}=this.state;
    let {campeaoLegume} = this.state;
    let {asIndiceGlicemico}=this.state;
    let mealpoints = this.state.meals.map(mealpoints =>{
      return (parseInt(mealpoints.vegetables))
    });

    let sumPoints = mealpoints.reduce((a, b) => a + b, 0);


    console.log(sumPoints)

    console.log("HHHHHH", this.state.todays_meal)

    console.log(home_chef);

    console.log(meals)












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
                style={styles.estrelas}
                color="#ED4838"
                onPress={ this.state.meals > 1 ? () => navigation.navigate('Score') : null}>
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
                style={styles.healthyscore}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Meals')}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Índice primeal
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






            {current_user.goal == 'alimentação + saudável e natural' && this.state.asIndiceGlicemico == true ?
            <TouchableOpacity
                style={styles.homemeals}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Meals')}>

                <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={glicemico}></Image>


                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Ás do índice glicémico
                </Text>

                </TouchableOpacity>
                :
                null

              }










              {current_user.goal == 'alimentação + saudável e variada' && this.state.craque_leguminosa == true ?

              <TouchableOpacity
                style={styles.homemeals}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Meals')}>

                <View>

                <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={leguminosa}></Image>


                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Craque da Leguminosa
                </Text>
                </View>
                </TouchableOpacity>
                :
                null
            }











            {current_user.goal == 'alimentação + saudável e natural' && this.state.mestre_legume == true?

              <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Mestre do Legume
                </Text>
                :
                null
            }








            {current_user.goal == 'alimentação + saudável e sustentável' && this.state.craque_flexitarianismo == true ?

              <TouchableOpacity
                style={styles.homemeals}
                color="#ED4838"
                onPress={() => this.props.navigation.navigate('Meals')}>

                <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={flexi}></Image>


                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Craque do Flexitarianismo
                </Text>

                </TouchableOpacity>
                :
                null
            }
            </View>

              {current_user.goal == 'alimentação + saudável e sustentável' && this.state.guardiao_planeta == true ?

              <TouchableOpacity
                style={styles.veggie}
                color="#ED4838"
                onPress={() => navigation.navigate('Refeições Vegetarianas', {vegetarian_meals})}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Guardião do Planeta
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={planeta}></Image>
                </View>
              </TouchableOpacity>

              : null
            }



            {current_user.goal == 'alimentação + saudável e variada' && this.state.campeaoLegume == true?

              <TouchableOpacity
                style={styles.veggie}
                color="#ED4838"
                onPress={() => navigation.navigate('Refeições Vegetarianas', {vegetarian_meals})}>
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Campeão do Legume
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={legume}></Image>
                </View>
              </TouchableOpacity>

              : null
            }





            {current_user.goal == 'alimentação + saudável e equilibrada' || 'alimentação + saudável e natural' ?
            this.state.home_chef == true ?

              <TouchableOpacity
                style={styles.veggie}
                color="#ED4838"
                >
                <Text style={{color: 'white', fontSize: 20, paddingLeft: 10}}>
                  Home Chef
                </Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    style={{height: 80, width: 80, marginBottom: 20}}
                    source={chef}></Image>
                </View>
              </TouchableOpacity>

              :null

              : null
            }


            <View>

                  <TouchableOpacity onPress={() => this.setModalVisible(true)}>

      <Text style={{color: 'white', textAlign: 'center', marginTop: 5}}>- ajuda -</Text>

      </TouchableOpacity>

      <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>

              <View style={styles.modalcontainer}>

              <View style={styles.modal}>
              <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
              <Text style={styles.close}>X</Text>
              </TouchableOpacity>
              <Text style={{textAlign: 'center', fontWeight: 'bold', padding: 50, fontSize: 18}}>
              Se estiver com dificuldade em entrar na app contacte o nosso suporte enviando um email para support@van.pt. Identifique o seu nome de utilizador e specifique o seu problema.
              </Text>

              </View>

              </View>

      </Modal>

            </View>


          </>
        )}

      <View style={styles.footer}>
        <FlatList
              data={meals.slice(Math.max(meals.length - 5, 0))}
              numColumns={5}
              style={{textAlign:'center'}}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('dayMeal', {item})}>
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
  modal:{
  position:'absolute',
  top:'30%',
  width: '80%',
  backgroundColor: 'white',

},
modalcontainer:{
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1
},
close:{
  textAlign: 'right',
  paddingLeft: 10,
  paddingRight: 10,
  fontWeight: 'bold',
  fontSize: 20
}
});
