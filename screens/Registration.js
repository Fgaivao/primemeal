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
            email: value.email,
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

          console.log(responseData);
        })

        .done();
    }
  }

  render() {
    const {navigation} = this.props;
    let {
      email,
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

          <TextInput
            caretHidden
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoCompleteType="email"
            onChangeText={(txt) => this.setState({email: txt})}
            placeholder="email"></TextInput>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({name: txt})}
            placeholder="nome"></TextInput>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({password: txt})}
            placeholder="password"></TextInput>

          <DatePicker
            style={styles.datepicker}
            date={dateofbirth}
            onDateChange={(txt) => this.setState({dateofbirth: txt})}
            mode="date"
          />

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({weight: txt})}
            placeholder="peso"
            keyboardType="numeric"
            ></TextInput>

          <TextInput
            style={styles.login}
            onChangeText={(txt) => this.setState({height: txt})}
            placeholder="altura"
            keyboardType="numeric"
            ></TextInput>

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
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({gender: itemValue})
              }>
              <Picker.Item label="género" value="género" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              textAlign: 'center',
              fontSize: 25,
              width: '50%',
              marginBottom: 20,
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

          <TouchableOpacity
            style={{
              textAlign: 'center',
              fontSize: 25,
              width: '50%',
              marginBottom: 20,
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
                label="cozinhar mais e melhor"
                value="cozinhar mais e melhor"
              />
              <Picker.Item
                 label="perder peso"
                 value="perder peso" />
              <Picker.Item
                label="comer de forma mais saudável"
                value="comer de forma mais saudável"
              />
              <Picker.Item
                label="alimentação sustentável"
                value="alimentação sustentável"
              />
            </Picker>
          </TouchableOpacity>

          <Button title="continuar" onPress={this._userSignup.bind(this)} />
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
  },
  login: {
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: 'white',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
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
});
