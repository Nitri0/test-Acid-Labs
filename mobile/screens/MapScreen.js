import React from 'react';
//import { MapView } from 'expo';
import { View, Text, Button, Modal, StyleSheet, Alert} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios'


export default class LinksScreen extends React.Component {
  constructor(props, context){
    super(props)
    this.getInfoCountry = this.getInfoCountry.bind(this)
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderTextModal = this.renderTextModal.bind(this);

    this.state = {
      show: false,
      loadingBar:false,
      dataModal: {
        title: "exampleTitle",
        text: {
          temperature:0,
          humidity:0,
          dailyMessage: "example"
        },
        errorMsg: ""
      }
    };
  }

  static navigationOptions = {
    title: 'Map',
  };  


  async getInfoCountry(c){
    this.setState({loadingBar: true})
    const url = "http://ec2-3-85-56-134.compute-1.amazonaws.com:3500/"
    let dataModal = {}
    try {
      const result = await axios.post(url, {lng:c.coordinate.longitude,lat:c.coordinate.latitude})
      if(result.data.success){
        const data = result.data.result
        dataModal = {
          title: data.timezone,
          text: {
            temperature: data.currently.temperature,
            humidity: data.currently.humidity,
            dailyMessage:data.daily.summary
          },
          errorMsg:""
        }
      }
    } catch (error) {
      Alert.alert(
        //title
        'OPS!',
        //body
        `ocurrio algo inesperado`,
        [
          {text: 'cerrar', onPress: () => console.log('No Pressed')},
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel        
      )
    }
    this.showModal(dataModal)
  }

  showModal(dataModal){
    this.setState({
      show:true,
      loadingBar: false,
      dataModal: dataModal
    })
  }

  closeModal() {
    this.setState({ show: false });
  }


  renderTextModal(){
    if (this.state.dataModal.errorMsg){
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            {this.state.dataModal.errorMsg}
          </Text>
        </View>  
        )
    }


    let textHumidity
    if (this.state.dataModal.text.humidity){
      const procentageHumidity = parseFloat(this.state.dataModal.text.humidity) * 100
      textHumidity = <Text>- Humedad: {procentageHumidity}%</Text>
    } else {
      textHumidity = <View></View>
    }

    return (
      <View style={styles.ContentTextStyle}>
        <Text>{this.state.dataModal.text.dailyMessage}</Text>
        <Text>Detalles:</Text>
        <View>
          <Text>- Temperatura: {this.state.dataModal.text.temperature} °C</Text>
          {textHumidity}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -26.777130611777086,
            longitude: -70.26052497092894,
            latitudeDelta: 15,
            longitudeDelta: 15,
          }}
          zoomEnabled={false}
          zoomTapEnabled= {false}         
          onPress = { (c) => {
            this.getInfoCountry(c.nativeEvent)
          }}
        />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.show}
          onRequestClose={()=>{}}
          >
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.ModalInsideView}>
              <Text style={styles.TitleTextStyle}>{this.state.dataModal.title}</Text>
              {this.renderTextModal()}
              <Button  title="Close" onPress={() => this.closeModal()} style={styles.closeBotom}/>
            </View>
          </View>            
        </Modal>        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  ModalInsideView:{
    backgroundColor : "#f6f8fa", 
    height: 300 ,
    width: '90%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#dfe2e5',
    paddingLeft:30,
    paddingTop:10,
    paddingRight:30
  },
  
  TitleTextStyle:{
    fontSize: 18, 
    marginBottom: 5, 
    color: "black",
    padding: 10,
    textAlign: 'center'
  },

  ContentTextStyle:{
    fontSize: 15, 
    marginBottom: 10, 
    color: "black",
    padding: 20,
  } ,
  closeBotom: {
    marginTop: 5
  }
  });