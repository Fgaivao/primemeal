import React, {Component} from 'react';
import {BarChart} from 'react-native-chart-kit';
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
    };
  }

  render() {
    let {isLoading} = this.state;

    const section = this.props.route.params.section.data;

    const {navigation} = this.props;

    console.log('WHAT IS THIS', section);

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


            <FlatList
              data={section}
              numColumns={7}
              renderItem={({item}) => (
                <View
                  style={{
                    marginHorizontal: 4,
                    width: 35,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection:'row', transform: [{ rotate: "180deg" }]}}>
                  <View style={{height: item.protperc, width: 2, backgroundColor: '#f07971', marginRight: 5, maxHeight: 30}}></View>
                  <View style={{height: item.hortperc, width: 2, backgroundColor: '#53b659', marginRight:5, maxHeight: 30}}></View>
                  <View style={{height: item.hydperc, width: 2, backgroundColor: '#f8c146', maxHeight: 30}}></View>
                  </View>
                  <Text>{moment(item.updatedAt).format('ddd')}</Text>

                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('currentWeekMeals', {section})}
              style={styles.confirm}>
              <Text style={styles.buttonText}>ver mais</Text>
            </TouchableOpacity>
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
    backgroundColor: '#42aae1',
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    width: 200,
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: 'white',
  }
});
