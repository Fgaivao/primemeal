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

export default class currentWeek extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      current_user: {},
      token: ''
    };
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
  }

  render() {
    let {isLoading} = this.state;

    const {current_user} = this.state

    const section = this.props.route.params.section.data;

    console.log(
      this.props.route.params.section.data.map((m) => {
        return m.healthyscore;
      }),
    );

    const collectionHealthy = this.props.route.params.section.data.map((m) => {
      return m.healthyscore;
    });

    const collectionTitle = this.props.route.params.section.data.map((m) => {
      return moment(m.updatedAt).format('ddd');
    });

    var sum = collectionHealthy.reduce(function (a, b) {
      return a + b;
    }, 0);

    const weekHealthy = sum / collectionHealthy.length;

    console.log('AVERAGE', weekHealthy);

    console.log('SUM', sum);

    console.log(collectionTitle);

    const {navigation} = this.props;

    console.log('WHAT IS THIS', section);

    const dataLine = {
      labels: ['start', 'week', 'week', 's', 'f', 't', 'r'],
      datasets: [
        {
          data: [weekHealthy, weekHealthy, weekHealthy, weekHealthy, weekHealthy, weekHealthy, weekHealthy,],
          color: () => '#42aae0', // optional
          strokeWidth: 5, // optional
        },
        { data: [0, 100], color: () => 'transparent' }
      ],
    };

    const chartConfigLine = {
      backgroundColor: 'transparent',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => 'white',
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.3,
      useShadowColorFromDataset: false, // optional
      fillShadowGradientOpacity: 1,
      labelColor: () => 'black',

    };

    const data = {
      labels: collectionTitle,
      datasets: [
        {
          data: collectionHealthy,
        },
        { data: [0, 100], color: () => 'transparent' }
      ],
    };

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
      backgroundColor: 'transparent',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => '#e5cde3',
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.3,
      useShadowColorFromDataset: false, // optional
      fillShadowGradientOpacity: 1,
      labelColor: () => 'black',
      height: 5000,
    };

    return (
      <View style={{backgroundColor: '#83c8e6', flex: 1}}>
        <TouchableOpacity style={styles.hamb}>
          <Icon
            name="navicon"
            color="white"
            size={25}
            onPress={() => navigation.toggleDrawer()}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Relatório semanal</Text>

        <View
          style={{
            backgroundColor: '#83c8e6',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              width: 320,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, textAlign: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:20, fontWeight: 'bold', marginTop: 10, color: '#707070'}}>O seu objetivo é:</Text>
            <TouchableOpacity style={{borderWidth: 2, borderColor: '#42aae0', width: 150, marginTop: 10, paddingTop: 10, paddingBottom: 10}}>
              <Text style={{textAlign: 'center', color: '#42aae0', fontSize: 20, fontWeight: 'bold'}}>{current_user.goal}</Text>



            </TouchableOpacity>




            <Text style={{fontSize:20, fontWeight: 'bold', marginTop:20 , color: '#707070'}}>Índice Primemeal</Text>

              <Text style={{fontSize:20, fontWeight: 'bold', marginTop: 10, color: '#707070'}}>{Math.floor(weekHealthy)}%</Text>

              </View>




            <View style={{position: 'absolute', top: '30%'}}>
              <BarChart
                data={data}
                width={300}
                height={220}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                withInnerLines={false}
                labelColor="black"
                fromZero
                withVerticalLabels={true}
                withHorizontalLabels={false}

              />

              <View style={{flexDirection: 'row', textAlign:'center', justifyContent: 'center'}}>

              <TouchableOpacity style={{backgroundColor: '#e5cde3', width: 20, height: 20, marginRight: 5}}></TouchableOpacity>

              <Text>HS Diário</Text>
              <TouchableOpacity style={{backgroundColor: '#42AAE0', width: 20, height: 20, marginLeft: 20, marginRight: 5}}></TouchableOpacity>
              <Text>HS Semanal</Text>

              </View>
            </View>

            <View style={{position: 'absolute', top: '30%'}}>
              <LineChart
                data={dataLine}
                width={screenWidth}
                height={220}
                chartConfig={chartConfigLine}
                withVerticalLines={false}
                withInnerLines={false}
                fromZero
                withDots={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withShadow={false}

              />
            </View>


            <View style={{flex: 1, marginTop: 350}}>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.confirm}>
              <Text style={styles.buttonText}>Fechar Relatório</Text>
            </TouchableOpacity>

            </View>
          </View>
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
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 60,
    marginTop: 60,
    marginBottom: 50,
  },
  confirm: {
    backgroundColor: '#42aae0',
    borderRadius: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
