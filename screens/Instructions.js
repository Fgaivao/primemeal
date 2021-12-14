import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

var nome = require('../instrucao-nome.jpg');
var ingredientes = require('../ingredientes.jpg');
var confeccao = require('../confeccao.jpg');
var composicao = require('../composicao.jpg');
var score = require('../score.jpg');
var limao = require('../limao.png');
var avatar = require('../avatar.png');
var grafico = require('../grafico.png');

export default class Instructions extends Component {
static navigationOptions = {
    //To hide the NavigationBar from current Screen
    headerShown: false,
  };

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              image: limao,
              title:"Bem-vindo à prime meal",
              text: "Um diário alimentar visual que te ajuda a alcançar objetivos pessoais de dieta sem culpa nem esforço. Insere os ingredientes principais o teu jantar e como foram preparados, e ganha pontos e informação diária sobre como os teus hábitos alimentares estão a contribuit para o teu objetivo",
          },
          {
              image: avatar,
              title:"Cria o teu perfil",
              text: "Cria o teu perfil e escolhe o teu objetivo",
          },
          {
              image: nome,
              title:"Dá um nome ao teu jantar",
              text: "Indica o nome do prato principal",
          },
          {
              image: confeccao,
              title:"Regista os teus ingredientes e a confecção",
              text: "Indica os ingredientes principais e modo de confecção, por grupo alimentar de compõe o prato, por grupo alimentar",
          },

          {
              image: composicao,
              title:"Regista as quantidades",
              text: "Indica as quantidades de cada ingrediente principal no teu prato",
          },
          {
              image: score,
              title:"Recebe a tua pontuação",
              text: "Acumula diariamente pontos e distinções prime meal para alcançares o objetivo traçado",
          },
          {
              image: grafico,
              title:"Avalia a tua performance",
              text: "Recebe semanalmente informação sobre os teus hábitos alimentares e como melhorá-los",
          },

        ]
      }
    }

    _renderItem({item,index}){



        return (
          <View style={{
              backgroundColor:'white',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              flex:1,
              padding: 50,
              width: '100%',
              textAlign:'center',
              justifyContent:'center',
              alignItems: 'center'
               }}>

            <Text style={{fontSize: 25, textAlign:'center', color: '#4a4a4a', fontWeight: 'bold'}}>{item.title}</Text>
            <Image style={{width: 200, height: 200}}source={item.image} />
            <Text style={{color: '#bdbdbd', fontSize: 18, textAlign:'center', fontWeight: 'bold'}}>{item.text}</Text>


          </View>

        )
    }


    get pagination () {
        const { carouselItems, activeSlide } = this.state;

        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'white' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,

                  backgroundColor: '#42aae1'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render() {

      const { navigation } = this.props;

        return (
          <SafeAreaView style={{flex: 1, paddingTop: 50, backgroundColor: '#8ec67f' }}>
          <Text style={styles.title}>Instruções</Text>
            <View style={{ flex: 1, justifyContent: 'center', }}>

                <Carousel
                  data={this.state.carouselItems}
                  renderItem={this._renderItem}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                  sliderWidth={400}
                  itemWidth={400}
                  navigation={this.props.navigation}
                />

                <View style={{textAlign:'center', justifyContent: 'center', alignItems: 'center', zIndex: 999}}>



            </View>

            <TouchableOpacity style={{position:'absolute', bottom: 100, backgroundColor: '#42aae1', padding:10, borderRadius: 25, zIndex: 999, alignSelf:'center'}} onPress={() => this.props.navigation.navigate('Login')} >
                <Text style={{color:'white'}}>Sair das instruções</Text>
            </TouchableOpacity>

                { this.pagination }
            </View>


          </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
title:{
  color:'white',
  textAlign:'center',
  fontSize:40,
  fontWeight: 'bold',
  marginBottom: 20
}



  })
