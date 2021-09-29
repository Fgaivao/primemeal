import React, {Component} from 'react';
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
import Score from './Score.js';

export default class currentWeekMeals extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

  render() {
    const meals = this.props.route.params.section;
    const {navigation} = this.props;



    return (
      <View style={styles.backback}>
        <TouchableOpacity style={styles.hamb}>
          <Icon
            name="navicon"
            color="white"
            size={25}
            onPress={() => navigation.toggleDrawer()}
          />
        </TouchableOpacity>

        <Text style={styles.pagetitle}>Histórico</Text>

        <View style={styles.back}>
          <FlatList
            data={meals}
            style={styles.list}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.date}>{moment(item.updatedAt).format('DD MMMM')}</Text>
                  <View style={{justifyContent: 'space-between'}}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={{textAlign: 'right'}}>{item.healthyscore/20}</Text>
                  </View>
                </View>
              </View>
            )}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backback: {
    flex: 1,
    backgroundColor: '#83c8e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 340,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  pagetitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
  },
  monthTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  date: {
    color: '#90cfef',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: '#d9d9d9',
    marginBottom: 10,
    fontSize: 10,
  },

  listItem: {
    paddingLeft: 20,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  hamb: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
