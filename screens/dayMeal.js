import React, {Component} from 'react';
import {BarChart, LineChart} from 'react-native-chart-kit';
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ReactNativeVectorIcons} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export default class dayMeal extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    let {isLoading} = this.state;
    const item = this.props.route.params.item;
    console.log(item.proteins[1])

    console.log(item)


    return(
      <SafeAreaView style={{flex:1, backgroundColor: '#42aae0'}}>
      <View style={{marginLeft: 30}}>

      <View style={{flexDirection: 'row'}}>
      <Text style={styles.title}>{moment(item.updatedAt).format('dddd')} </Text>
      <Text style={styles.title}>{moment(item.updatedAt).format('DD')}</Text>
      </View>
      <Text style={styles.nameTitlePlate}>Nome do Prato</Text>
      <Text style={styles.name}>{item.name}</Text>

      <Text style={styles.nameTitle}>Composição do Prato</Text>
      <View style={{flexDirection: 'row', width: "80%", justifyContent: 'space-between', marginTop: 20}}>

      <Text style={styles.name}>Proteína</Text>
      <Text style={styles.name}>{item.protperc}%</Text>
      <Text style={styles.name}>{item.proteins[1]}</Text>

      </View>

       <View style={{flexDirection: 'row', width: "80%", justifyContent: 'space-between', marginTop: 20}}>

      <Text style={styles.name}>Hidratos</Text>
      <Text style={styles.name}>{item.hydperc}%</Text>
      <Text style={styles.name}>{item.hydrates[1]}</Text>

      </View>


      <View style={{flexDirection: 'row', width: "80%", justifyContent: 'space-between', marginTop: 20}}>

      <Text style={styles.name}>Hortícolas</Text>
      <Text style={styles.name}>{item.hortperc}%</Text>
      <Text style={styles.name}>{item.vegetables[1]}</Text>

      </View>

      <View>
      <Text style={styles.nameTitle}>Estrelas Refeição</Text>
      <Text style={styles.name}>{Math.ceil((item.healthyscore * 0.1)/2)}</Text>

      </View>
      <Text style={styles.nameTitle}>Score</Text>
      <Text style={styles.name}>{item.healthyscore }</Text>
      </View>
      </SafeAreaView>
      );


  }
}

const styles = StyleSheet.create({
title:{
  color: 'white',
  marginTop: 50,
  fontSize: 30,
  fontWeight: 'bold'
},
nameTitle:{
  marginTop: 20,
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold'
},
nameTitlePlate:{
  marginTop: 50,
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold'
},
name:{
  marginTop: 10,
  color: 'white',
  width: '33%'
}



  })
