import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {PieChart} from 'react-native-chart-kit';
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
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import CheckboxList from 'rn-checkbox-list';
import moment from 'moment';

var newmeal = require('../add-dinner.png');

var STORAGE_KEY = 'token';
var week = '';
var vegetarian = {};
var user_id = '';
var name = '';
var current_user = '';
var proteins = [];
var vegetables = [];
var hydrates = [];
var proteinconfection = '';
var vegetablesconfection = '';
var hydratesconfection = '';
var protperc = 0;
var hidrperc = 0;
var hortperc = 0;

export default class mealNew extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      week: '',
      name: '',
      user_id: '',
      token: '',
      vegetarian: false,

      proteins: [],

      vegetables: [],

      it: [],

      hydrates: [],

      vegetablesconfection: '',
      hydratesconfection: '',
      proteinconfection: [],

      confection: 'modo de confecção',
      selectedValue: 'por mim em casa',
      checked: false,
      modalVisible: false,
      modalVisibleTwo: false,
      modalVisibleconf: false,
      modalVisibleconfHort: false,
      modalVisibleHid: false,

      protperc: 25,
      hidrperc: 34,
      hortperc: 0,
      percentageProteinValue: 0,
      percentageHidratesValue: 0,
      percentageVegetablesValue: 0,
    };
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

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

  async percentageValue() {
    var modalVisible = this.state.modalVisible;

    var percentageProteinValue = this.state.percentageProteinValue;
    var percentageHidratesValue = this.state.percentageHidratesValue;
    var percentageVegetablesValue = this.state.percentageVegtablesValue;

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

    if (this.state.protperc < 9 || this.state.properc > 39) {
      this.setState({percentageProteinValue: 0});
    }
    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.protperc > 9 &&
      this.state.protperc < 19
    ) {
      this.setState({percentageProteinValue: 1});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.protperc > 9 &&
      this.state.protperc < 19
    ) {
      this.setState({percentageProteinValue: 2});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.protperc > 19 &&
      this.state.protperc < 29
    ) {
      this.setState({percentageProteinValue: 6});
    }
    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.protperc > 19 &&
      this.state.protperc < 29
    ) {
      this.setState({percentageProteinValue: 7});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.protperc > 29 &&
      this.state.protperc < 39
    ) {
      this.setState({percentageProteinValue: 3});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.protperc > 29 &&
      this.state.protperc < 39
    ) {
      this.setState({percentageProteinValue: 2});
    }

    if (this.state.hidrperc > 49) {
      this.setState({percentageHidratesValue: 0});
    }

    if (this.state.hidrperc < 9) {
      this.setState({percentageHidratesValue: 2});
    }

    if (this.state.hidrperc > 9 && this.state.hidrperc < 19) {
      this.setState({percentageHidratesValue: 4});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hidrperc > 19 &&
      this.state.hidrperc < 29
    ) {
      this.setState({percentageHidratesValue: 4});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hidrperc > 19 &&
      this.state.hidrperc < 29
    ) {
      this.setState({percentageHidratesValue: 6});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hidrperc > 29 &&
      this.state.hidrperc < 39
    ) {
      this.setState({percentageHidratesValue: 4});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hidrperc > 29 &&
      this.state.hidrperc < 39
    ) {
      this.setState({percentageHidratesValue: 2});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hidrperc > 39 &&
      this.state.hidrperc < 49
    ) {
      this.setState({percentageHidratesValue: 0});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hidrperc > 39 &&
      this.state.hidrperc < 49
    ) {
      this.setState({percentageHidratesValue: 2});
    }

    if (this.state.hortperc < 29 || this.state.hortperc > 79) {
      this.setState({percentageVegetablesValue: 0});
    }

    if (this.state.hortperc > 29 && this.state.hortperc < 39) {
      this.setState({percentageVegetablesValue: 2});
    }

    if (this.state.hortperc > 39 && this.state.hortperc < 49) {
      this.setState({percentageVegetablesValue: 4});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hortperc > 49 &&
      this.state.hortperc < 59
    ) {
      this.setState({percentageVegetablesValue: 9});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hortperc > 49 &&
      this.state.hortperc < 59
    ) {
      this.setState({percentageVegetablesValue: 8});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hortperc > 59 &&
      this.state.hortperc < 69
    ) {
      this.setState({percentageVegetablesValue: 6});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hortperc > 59 &&
      this.state.hortperc < 69
    ) {
      this.setState({percentageVegetablesValue: 4});
    }

    if (
      this.state.current_user.goal == 'Perder peso' &&
      this.state.hortperc > 69 &&
      this.state.hortperc < 79
    ) {
      this.setState({percentageVegetablesValue: 4});
    }

    if (
      this.state.current_user.goal != 'Perder peso' &&
      this.state.hortperc > 69 &&
      this.state.hortperc < 79
    ) {
      this.setState({percentageVegetablesValue: 2});
    }

    this.setModalVisible(!modalVisible);
  }

  _newMeal() {
    //Alert.alert(JSON.stringify(this.state.hydrates));

    const {percentageProteinValue} = this.state;
    const {percentageVegetablesValue} = this.state;
    const {percentageHidratesValue} = this.state;
    const proint = parseInt(this.state.proteins);

    const proconfint = parseInt(this.state.proteinconfection);

    const sumProt = proint + percentageProteinValue + proconfint;

    const hidrint = parseInt(this.state.hydrates);

    const hidrconfint = parseInt(this.state.hydratesconfection);

    const sumHidr = percentageHidratesValue + hidrint + proconfint;

    const vegeint = parseInt(this.state.vegetables);

    const vegeconfint = parseInt(this.state.vegetablesconfection);

    const sumVege = percentageVegetablesValue + vegeint + vegeconfint;

    var ponderadorSituacao = 1.54;

    if (current_user.goal == 'cozinhar mais e melhor') {
      ponderadorSituacao = 1.25;
    }

    var token = current_user.token;
    let value = ({
      name,
      week,
      vegetarian,
      user_id,
      current_user,
      proteins,
      vegetables,
      hydrates,
      proteinconfection,
      hydratesconfection,
      vegetablesconfection,
      hortperc,
      hidrperc,
      protperc,
    } = this.state);
    if (value) {
      // if validation fails, value will be null
      fetch('http://www.pmeal.org/api/meals', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.state.token,
        },
        body: JSON.stringify({
          meal: {
            name: value.name,
            user_id: current_user.id,
            user: current_user,
            vegetarian: vegetarian,
            proteins: JSON.stringify(this.state.proteins),
            vegetables: JSON.stringify(this.state.vegetables),
            hydrates: JSON.stringify(this.state.hydrates),
            hydconfection: this.state.hydratesconfection,
            protconfection: this.state.proteinconfection,
            hortconfection: this.state.vegetablesconfection,
            hydperc: Math.ceil(
              (this.state.hidrperc * 100) /
                (this.state.hortperc +
                  this.state.protperc +
                  this.state.hidrperc),
            ),
            hortperc: Math.ceil(
              (this.state.hortperc * 100) /
                (this.state.hortperc +
                  this.state.protperc +
                  this.state.hidrperc),
            ),
            protperc: Math.ceil(
              (this.state.protperc * 100) /
                (this.state.hortperc +
                  this.state.protperc +
                  this.state.hidrperc),
            ),
            week: Math.ceil(moment().date() / 7),
            //token: current_user.token
            healthyscore: Math.floor(
              (sumVege + sumHidr + sumProt) * ponderadorSituacao,
            ),
          },
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log('RESPONSE', responseData);

          if (responseData.status === 500) {
            Alert.alert('Só podes criar uma refeição por dia');
          } else {
            this.props.navigation.navigate('Score');
          }
        })

        .done();
    }
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    const {navigation} = this.props;
    let {vegetarian, user_id} = this.state;

    let {current_user} = this.state;

    const {proteinsList} = this.state;

    const {proteins} = this.state;

    const {vegetablesList} = this.state;

    const {vegetables} = this.state;

    const {checked} = this.state;

    const {modalVisible} = this.state;

    const {modalVisibleTwo} = this.state;

    const {modalVisibleconf} = this.state;

    const {modalVisibleconfHort} = this.state;

    const {modalVisibleHid} = this.state;

    const {confection} = this.state;

    const {hydratesList} = this.state;

    const {hydrates} = this.state;

    const {selectedValue} = this.state;

    const {proteinconfection} = this.state;

    const {percentageProteinValue} = this.state;
    const {percentageHidratesValue} = this.state;
    const {percentageVegetablesValue} = this.state;

    console.log(this.state.protperc);
    console.log(this.state.hidrperc);
    console.log(this.state.hortperc);
    console.log(this.state.current_user.goal);

    console.log('Percentage Value', this.state.percentageProteinValue);
    console.log('Percentage Value', this.state.percentageHidratesValue);
    console.log('Percentage Value', this.state.percentageVegetablesValue);

    const data = [
      {
        name: 'proteínas',
        percentagem: isNaN(parseFloat(this.state.protperc))
          ? 33
          : parseInt(this.state.protperc),
        color: '#f07971',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'hidratos',
        percentagem: isNaN(parseFloat(this.state.hidrperc))
          ? 33
          : parseInt(this.state.hidrperc),
        color: '#f8c146',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'hortícolas',
        percentagem: isNaN(parseFloat(this.state.hortperc))
          ? 33
          : parseInt(this.state.hortperc),
        color: '#8ec67f',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      radius: 80,
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      useShadowColorFromDataset: false, // optional
    };

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#83C8E6',
        }}>
        <ScrollView>
          <Text style={styles.title}>Adicionar Jantar</Text>
          <View style={styles.addmeal}>
            <Image source={newmeal}></Image>

            <TextInput
              placeholder="nome do prato"
              onChangeText={(txt) => this.setState({name: txt})}
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
            />

            <Pressable style={[styles.buttonOpen, styles.prot, styles.confec]}>
              <Picker
                selectedValue={this.state.proteins}
                style={{
                  color: 'white',

                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 550,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({proteins: itemValue})
                }>
                <Picker.Item label="proteínas" value="proteínas" />
                <Picker.Item
                  label="Carnes vermelhas (vaca, porco, borrego, cabrito)"
                  value={current_user.goal == 'perder peso' ? '2, ' : '4, '}
                />

                <Picker.Item
                  label="Carnes brancas (frango, perú, coelho, pato)"
                  value={current_user.goal == 'alimentação sustentável' ? '9, ' : '10, '}
                />


                <Picker.Item
                  label="Ovos"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '8, '
                      : '9, '
                  }
                />

                <Picker.Item label="Pescado" value='10, 0'  />
                <Picker.Item
                  label="Queijo, fiambre"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '4, '
                      : '5, '
                  }
                />
                <Picker.Item
                  label="Leguminosas secas (grão, feijão, lentilhas)"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '10, '
                      : '8, '
                  }
                />

                <Picker.Item
                  label="Leguminosas verdes (ervilhas, favas, edamame)"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '8, 0'
                      : '7, 0'
                  }
                />

                <Picker.Item
                  label="Cereais, sementes, quinoa, frutos secos"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '8, '
                      : '7, '
                  }
                />

                <Picker.Item
                  label="Cogumelos, tofu, seitan"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '9, 0'
                      : '8, 0'
                  }
                />

                <Picker.Item label="nenhuma" value="1, " />
              </Picker>
            </Pressable>

            <Pressable style={[styles.buttonOpen, styles.prot, styles.confec]}>
              <Picker
                selectedValue={this.state.proteinconfection}
                style={{
                  color: 'white',
                  width: 200,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 500,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({proteinconfection: itemValue})
                }>
                <Picker.Item
                  label="modo de confecção"
                  value="modo de confecção"
                />
                <Picker.Item
                  label="por mim em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '10' : '5'
                  }
                />

                <Picker.Item
                  label="Por mim e outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '8' : '4'
                  }
                />
                <Picker.Item
                  label="por outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '6' : '3'
                  }
                />

                <Picker.Item label="Fora de casa (restauração)" value="0" />
                <Picker.Item
                  label="Pré-confecionado (indústria ou retalho alimentar)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '2' : '1'
                  }
                />

                <Picker.Item
                  label="Nenhuma (consumido in natura)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '4' : '2'
                  }
                />
              </Picker>
            </Pressable>

            <Pressable style={[styles.buttonOpen, styles.hid, styles.confec]}>
              <Picker
                selectedValue={this.state.hydrates}
                style={{
                  color: 'white',
                  width: 200,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 500,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({hydrates: itemValue})
                }>
                <Picker.Item label="hidratos" value="hidratos" />
                <Picker.Item
                  label="batatas"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '3, '
                      : '4, '
                  }
                />
                <Picker.Item label="arroz" value="3, 0" />
                <Picker.Item label="Massa, couscous, polenta" value="3, " />
                <Picker.Item
                  label="Pão, pita, wrap, tortilla, crepe, pizza"
                  value="2, 0"
                />
                <Picker.Item
                  label="Leguminosas secas (grão, feijão, lentilhas)"
                  value="10, "
                />
                <Picker.Item
                  label="Leguminosas verdes (ervilhas, favas, edamame)"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '8, '
                      : '7, '
                  }
                />
                <Picker.Item
                  label="Quinoa, bulgur, arroz, massa ou couscous integrais"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '10, '
                      : '9, '
                  }
                />
                <Picker.Item
                  label="Batata doce, milho doce, beterraba"
                  value={
                    current_user.goal == 'alimentação sustentável'
                      ? '5, '
                      : '6, '
                  }
                />

                <Picker.Item label="nenhuma" value="2, " />
              </Picker>
            </Pressable>

            <Pressable style={[styles.buttonOpen, styles.hid, styles.confec]}>
              <Picker
                selectedValue={this.state.hydratesconfection}
                style={{
                  color: 'white',
                  width: 200,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 500,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({hydratesconfection: itemValue})
                }>
                <Picker.Item
                  label="modo de confecção"
                  value="modo de confecção"
                />
                <Picker.Item
                  label="por mim em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '8' : '5'
                  }
                />

                <Picker.Item
                  label="Por mim e outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '6' : '4'
                  }
                />
                <Picker.Item
                  label="por outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '5' : '3'
                  }
                />

                <Picker.Item label="Fora de casa (restauração)" value="0" />
                <Picker.Item
                  label="Pré-confecionado (indústria ou retalho alimentar)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '2' : '1'
                  }
                />

                <Picker.Item
                  label="Nenhuma (consumido in natura)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '3' : '2'
                  }
                />
              </Picker>
            </Pressable>

            <Pressable style={[styles.buttonOpen, styles.hort, styles.confec]}>
              <Picker
                selectedValue={this.state.vegetables}
                style={{
                  color: 'white',
                  width: 300,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({vegetables: itemValue})
                }>
                <Picker.Item label="hortícolas" value="hortícolas" />
                <Picker.Item
                  label="Alface, agrião, rúcula, tomate para salada, pepino, pimento, aipo, rabanetes, couve roxa"
                  value="7, "
                />
                <Picker.Item
                  label="Cebola, tomate ou produtos de tomate para cozinhar, alho, alho francês"
                  value="5, "
                />
                <Picker.Item
                  label="Couves (portuguesa, lombardo, coração, branca, chinesa), grelos, espinafres, nabiças, acelgas"
                  value="10, "
                />
                <Picker.Item
                  label="Couves (flor, bróculos, romanesco, bruxelas), feijão verde, ervilhas de vagem (tortas, de quebrar)"
                  value="10, "
                />
                <Picker.Item
                  label="Cenoura, abóbora, nabo, cheróvias, chuchu, curgete, beringela"
                  value="8, "
                />
                <Picker.Item
                  label="Espargos, alcachofras, endívias"
                  value="9, "
                />
                <Picker.Item label="Cogumelos" value="6, " />

                <Picker.Item label="nenhuma" value="0, " />
              </Picker>
            </Pressable>

            <Pressable style={[styles.buttonOpen, styles.hort, styles.confec]}>
              <Picker
                selectedValue={this.state.vegetablesconfection}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 500,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({vegetablesconfection: itemValue})
                }>
                <Picker.Item
                  label="modo de confecção"
                  value="modo de confecção"
                />
                <Picker.Item
                  label="por mim em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '8' : '5'
                  }
                />

                <Picker.Item
                  label="Por mim e outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '6' : '4'
                  }
                />
                <Picker.Item
                  label="por outra pessoa em casa"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '5' : '3'
                  }
                />

                <Picker.Item label="Fora de casa (restauração)" value="0" />
                <Picker.Item
                  label="Pré-confecionado (indústria ou retalho alimentar)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '2' : '1'
                  }
                />
                <Picker.Item
                  label="Nenhuma (consumido in natura)"
                  value={
                    current_user.goal == 'cozinhar mais e melhor' ? '3' : '2'
                  }
                />
              </Picker>
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <ScrollView
                  style={{
                    backgroundColor: 'white',
                    flex: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: '#6f6f6f',
                      fontSize: 25,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    Composição do prato
                  </Text>
                  <PieChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                    accessor={'percentagem'}
                    backgroundColor={'transparent'}
                    paddingLeft={'15'}
                    center={[20, 10]}
                  />

                  <View style={{alignItems: 'center'}}>
                    <TextInput
                      textAlign={'center'}
                      keyboardType="numeric"
                      placeholder="proteínas %"
                      onChangeText={(percentage) =>
                        this.setState({protperc: parseInt(percentage)})
                      }
                    />
                    <TextInput
                      textAlign={'center'}
                      keyboardType="numeric"
                      placeholder="hidratos %"
                      onChangeText={(percentagehid) =>
                        this.setState({hidrperc: parseInt(percentagehid)})
                      }
                    />
                    <TextInput
                      textAlign={'center'}
                      keyboardType="numeric"
                      placeholder="hortícolas %"
                      onChangeText={(percentagehor) =>
                        this.setState({hortperc: parseInt(percentagehor)})
                      }
                    />

                    <Pressable
                      style={styles.confirm}
                      onPress={this.percentageValue.bind(this)}>
                      <Text style={styles.buttonText}>confirmar</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </Modal>

            <Pressable
              style={[styles.buttonOpen, styles.comp, styles.confec]}
              onPress={() => this.setModalVisible(true)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginLeft: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                composição do prato
              </Text>
            </Pressable>

            <CheckBox
              style={styles.vege}
              title="vegetariano"
              checked={this.state.vegetarian}
              onPress={() =>
                this.setState({vegetarian: !this.state.vegetarian})
              }
            />

            <TouchableOpacity
              onPress={this._newMeal.bind(this)}
              style={styles.confirm}>
              <Text style={styles.buttonText}>confirmar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    color: 'white',
    fontSize: 35,
    fontWeight: '700',
    paddingTop: 50,
    paddingBottom: 50,
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
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    width: 200,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  vege: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  prot: {
    backgroundColor: '#f07971',
    textAlign: 'center',
  },

  hid: {
    backgroundColor: '#f8c146',
  },

  hort: {
    backgroundColor: '#53b659',
  },
  comp: {
    backgroundColor: '#41a9e1',
  },
  confection: {
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#838383',
  },
  confec: {
    borderRadius: 20,
    elevation: 2,
    width: 270,
  },
});
