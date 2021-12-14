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
  ActivityIndicator,
  Modal
} from 'react-native';

var inico = require ('../inico.png');
var logo = require('../logo-primeal.png')

var STORAGE_KEY = 'token';
var email = 'email';
var username = 'username'
var password = 'password';
var username = 'username';

export default class LoginScreen extends Component {

static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false
  };

  constructor(props) {
      super(props);
      this.state = {
       current_user: {},
       username: '',
        email: '',
        password:'',
        isLoading: false,
        erro: false,
        modalVisible: false,
      };
    }

    setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };



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
        this.props.navigation.navigate('Home');
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
          username: value.username,
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
        this.props.navigation.navigate('Home');
        //Alert.alert(JSON.stringify(current_user.user))

        this.setState({isLoading: true});
      }

      else{
        console.log('error')
        this.setState({erro: true})
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
    var {erro} = this.state;
    const { navigation } = this.props;
    let {email, password, username}=this.state;
    let {isLoading}=this.state;
    let {modalVisible}=this.state;


  return (


    <View style={{ flex: 1 }}>
    <ImageBackground source={inico} style={styles.image}>

    {isLoading == true ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

    <View style={styles.logocontainer}>
    <Image source={logo} style={styles.logo}/>
    </View>

    <TextInput
          style={styles.login}
          onChangeText={ (txt)=> this.setState({username: txt}) }
          placeholder="username">
    </TextInput>


    <TextInput
          style={styles.login}
          secureTextEntry={true}
          onChangeText={ (txt)=> this.setState({password: txt}) }
          placeholder="password">

    </TextInput>



      <TouchableOpacity style={styles.registrer} onPress={this._userLogin.bind(this)}>

      <Text style={{color:"white", padding:10, width: 200, textAlign: 'center', fontSize: 20, fontWeight: "100"}}>Iniciar Sessão</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('Sign Up')}>

      <Text style={{color:"white", padding:10, width: 200, textAlign: 'center', fontSize: 20, fontWeight: "100"}}>Criar Conta</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.setModalVisible(true)}>

      <Text style={{color: 'white', textAlign: 'center', marginTop: 5}}>- não consigo entrar -</Text>

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

      {this.state.erro == true ? <View style={{width: '80%', textAlign:'center'}}>
      <Text style={{marginTop: 20}}>Erro a iniciar, verifique o nome de utilizador e a password são as correctas</Text>
    </View> : null}



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
  marginTop: 20,

},
buttonLogin:{
  backgroundColor: "#42aae0",
  marginTop: 20,

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
},
logo:{
  height: 50
},

logocontainer: {
  textAlign:'center',
  alignItems: 'center',
  marginBottom: 40
}



})
