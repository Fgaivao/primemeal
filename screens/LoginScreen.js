import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

var inico = require ('../inico.png');

var STORAGE_KEY = 'token';
var email = 'email';
var password = 'password';
var username = 'username'

export default class LoginScreen extends Component {

static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false
  };

  constructor(props) {
      super(props);
      this.state = {
       current_user: {},
        email: '',
        password:'',
        isLoading: false
      };
    }



    // Após receber o utilizador gravá-lo como current_user
    async storeUser(user) {
    try {
       await AsyncStorage.setItem("current_user", user);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("current_user");
      let data = JSON.parse(userData);
      console.log("LOGIN SCREEN",data);

      if(data){
        this.props.navigation.navigate('Perfil');
      }
      else{
        this.props.navigation.navigate('Instruções')
        console.log('error', error)
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  async _userLogout() {
    try {
      await AsyncStorage.removeItem("current_user");

    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _userLogin() {

    this.setState({isLoading: true})

    let value = {email, password, username}=this.state;
    try {
    // if validation fails, value will be null

     let response = await fetch("http://www.pmeal.org/api/users/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user:{
          email: value.email,
          password: value.password,
        }
        })
      })

     console.log(response)
     let current_user = await response.json()
      // console.log(responseJson)
      if(response.status == 200){

  // store user é a função para gravar o utilizador recebido pelo fetch
      console.log(current_user)
        this.storeUser(JSON.stringify(current_user.user));
        this.setState({current_user: current_user.user})
        this.props.navigation.navigate('Perfil');
        //Alert.alert(JSON.stringify(current_user.user))

        this.setState({isLoading: true});
      }

      else{
        console.log('error')
      }

  }
  catch (error) {
    console.error(error);
  }
  }

  componentDidMount(){
    this.getToken()
  }






  render(){
    const { navigation } = this.props;
    let {email, password}=this.state;
    let {isLoading}=this.state;


  return (


    <View style={{ flex: 1 }}>
    <ImageBackground source={inico} style={styles.image}>
    {isLoading == true ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

    <TextInput
          style={styles.login}
          onChangeText={ (txt)=> this.setState({email: txt}) }
          placeholder="email">
    </TextInput>


    <TextInput
          style={styles.login}
          secureTextEntry={true}
          onChangeText={ (txt)=> this.setState({password: txt}) }
          placeholder="password">

    </TextInput>

      <Button
        title="Login"
        onPress={this._userLogin.bind(this)}
      />

      <TouchableOpacity style={styles.registrer} onPress={() => this.props.navigation.navigate('Sign Up')}>

      <Text style={{color:"white", padding:10}}>Sign Up</Text>

      </TouchableOpacity>




      </View>
      </>
        )}
      </ImageBackground>
    </View>



  );
}
}

const styles = StyleSheet.create({
image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
},
login:{
  textAlign: 'center',
  fontSize: 18,
  backgroundColor: 'white',
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  width: 300
},
title: {
    textAlign: 'center',
    marginVertical: 8,
  },
btnview:{

paddingTop: 20,
marginRight: 20,
marginLeft:20
},
contacts:{
  paddingTop: 20,
  textAlign: 'center',
  fontSize: 15
},
contact:{
  textAlign: 'center'
},
registrer:{
  backgroundColor: "#f07971",
  marginTop: 20
}



})
