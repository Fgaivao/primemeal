import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  Pressable,
  Picker,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

var token = '';
var email = '';
var username = '';
var password = '';
var name = '';
var dateofbirth = '';
var gender = '';
var weight = '';
var height = '';
var diet = '';
var goal = '';

export default class Registration extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      token: token,
      email: 'example@example.com',
      username: '',
      name: '',
      password: '',
      dateofbirth: new Date(),
      gender: '',
      weight: '',
      height: '',
      diet: '',
      goal: '',
    };
  }

  async storeToken(token) {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      // saving error
    }
  }

  _userSignup() {
    let value = ({
      email,
      username,
      password,
      name,
      dateofbirth,
      gender,
      weight,
      height,
      diet,
      goal,
    } = this.state);
    if (value) {
      // if validation fails, value will be null
      fetch('http://www.pmeal.org/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {

            username: value.username,
            name: value.name,
            password: value.password,
            dateofbirth: value.dateofbirth,
            gender: value.gender,
            weight: value.weight,
            height: value.height,
            diet: value.diet,
            goal: value.goal,
          },
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.storeToken(token, responseData.token);
          this.props.navigation.navigate('Login');

          console.log("ERRORS", responseData);
        })

        .done();
    }
  }

  render() {
    const {navigation} = this.props;
    let {
      email,
      username,
      password,
      name,
      dateofbirth,
      gender,
      weight,
      height,
      diet,
      goal,
    } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e5cde3',
        }}>
        <View style={styles.addmeal}>
          <Text style={styles.perfil}>Perfil</Text>

          <View style={styles.textinput}>
          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({username: txt})}
            placeholder="username"></TextInput>
            </View>


          <View style={styles.textinput}>
          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({name: txt})}
            placeholder="nome"></TextInput>
            </View>

            <View style={styles.textinput}>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({password: txt})}
            placeholder="password"></TextInput>

            </View>

            <View style={styles.dateInput}>

            <Text style={{textAlign: 'center', marginTop: 20}}>Data de Nascimento</Text>

          <DatePicker
            style={styles.datepicker}
            date={dateofbirth}
            onDateChange={(txt) => this.setState({dateofbirth: txt})}
            mode="date"
          />

          </View>

          <View style={styles.textinput}>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({weight: txt})}
            placeholder="peso"
            keyboardType="numeric"
            ></TextInput>

            </View>

            <View style={styles.textinput}>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({height: txt})}
            placeholder="altura"
            keyboardType="numeric"
            ></TextInput>

            </View>

            <View style={styles.textinput}>

          <TouchableOpacity
            style={{
              textAlign: 'center',
              fontSize: 25,
              width: '50%',
              marginBottom: 20,
            }}>
            <Picker
              selectedValue={this.state.gender}
              style={{
                color: '#b1b1b1',
                fontSize: 25,
                width: 200,
                textAlign: 'center',
                height: 20,
                marginTop: 20
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({gender: itemValue})
              }>
              <Picker.Item label="género" value="género" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </TouchableOpacity>

          </View>

          <View style={styles.textinput}>

          <TouchableOpacity
            style={{
              textAlign: 'center',
              fontSize: 25,
              width: '50%',
              marginBottom: 20,
              height: 20,
              marginTop: 20
            }}>
            <Picker
              selectedValue={this.state.diet}
              style={{
                color: '#b1b1b1',
                fontSize: 25,
                width: 200,
                textAlign: 'center',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({diet: itemValue})
              }>
              <Picker.Item label="regime alimentar" value="regime alimentar" />
              <Picker.Item
                label="nenhum em particular"
                value="nenhum em particular"
              />
              <Picker.Item label="vegano" value="vegano" />
              <Picker.Item label="vegetariano" value="vegetariano" />
              <Picker.Item label="controle de peso" value="controle de peso" />
              <Picker.Item label="perda de peso" value="perda de peso" />
            </Picker>
          </TouchableOpacity>

          </View>


          <View style={styles.textinput}>

          <TouchableOpacity
            style={{
              textAlign: 'center',
              fontSize: 25,
              width: '50%',
              marginBottom: 20,
              height: 20,
              marginTop: 20
            }}>
            <Picker
              selectedValue={this.state.goal}
              style={{
                color: '#b1b1b1',
                fontSize: 25,
                width: 200,
                textAlign: 'center',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({goal: itemValue})
              }>
              <Picker.Item label="objetivo pessoal" value="objetivo pessoal" />
              <Picker.Item
                label="alimentação + saudável e variada"
                value="alimentação + saudável e variada"
              />
              <Picker.Item
                 label="alimentação + saudável e sustentável"
                 value="alimentação + saudável e sustentável" />
              <Picker.Item
                label="alimentação + saudável e equilibrada"
                value="alimentação + saudável e equilibrada"
              />
              <Picker.Item
                label="alimentação + saudável e natural"
                value="alimentação + saudável e natural"
              />
            </Picker>
          </TouchableOpacity>

          </View>

          <TouchableOpacity style={styles.criarconta} onPress={this._userSignup.bind(this)}>

          <Text style={{textAlign: 'center', color: 'white', paddingRight:20, paddingLeft: 20, fontSize:18, paddingTop: 10, paddingBottom: 10, fontWeight: '100'}}>Criar Conta</Text>

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  addmeal: {
    backgroundColor: 'white',
    flex: 1,
    width: 320,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    marginTop: 80,
  },
  perfil: {
    color: '#b1b1b1',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30
  },
  login: {
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: 'white',
    width: '100%',
    borderBottomColor: '#cecece'
  },
  datepicker: {
    height: 50,
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
  textinput:{
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    width:'60%',
    textAlign:'center'
  },

  dateinput:{
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,

  },
  email:{
    textAlign: 'center'
  },
  criarconta:{
    backgroundColor: '#42aae0',
    borderRadius: 25,
    marginTop: 35
  }
});
