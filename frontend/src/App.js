import React, { Component } from 'react';
import { Map, GoogleApiWrapper  } from 'google-maps-react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.getInfoCountry = this.getInfoCountry.bind(this)
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderTextModal = this.renderTextModal.bind(this);

    this.state = {
      show: false,
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

  async getInfoCountry(c){
    const url = process.env.REACT_APP_API_URL
    let dataModal = {}
    try {
      const result = await axios.post(url, {lat:c.latLng.lat(), lng: c.latLng.lng()})
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
      console.log(dataModal)
    } catch (error) {
      dataModal = {
        title: "Ops! :(",
        text:{},
        errorMsg: "En estos momentos estamos presentado problemas, inténtelo luego."
      }
    }
    this.showModal(dataModal)
  }

  showModal(dataModal){
    this.setState({
      show:true,
      dataModal: dataModal
    })
  }

  closeModal() {
    this.setState({ show: false });
  }

  renderTextModal(){
    if (this.state.dataModal.errorMsg){
      return (
        <div>
          <p>{this.state.dataModal.errorMsg}</p>
        </div>)
    }

    let textHumidity
    if (this.state.dataModal.text.humidity){
      const procentageHumidity = parseFloat(this.state.dataModal.text.humidity) * 100
      textHumidity = <li>Humedad: {procentageHumidity}%</li>
    } else {
      textHumidity = <div></div>
    }

    return (
      <div>
        <p>{this.state.dataModal.text.dailyMessage}</p>
        <label>Detalles:</label>
        <ul>
          <li>Temperatura: {this.state.dataModal.text.temperature} °C</li>
          {textHumidity}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div> 
        <Modal show={this.state.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.dataModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderTextModal()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>        
        <Map
          google={this.props.google}
          zoom={5}
          style={mapStyles}
          initialCenter={{
            lat:-26.777130611777086,
            lng:-70.26052497092894
          }}
          zoomControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
          scaleControl={false}
          scrollwheel={false}
          disableDoubleClickZoom={true}
          onClick = { (t, map, c) => {
            this.getInfoCountry(c)
          }
        }
        />
      </div>
    );
  }
}

const LoadingContainer = (props) => (
  <div style={{ flex: 1,   width: '100%', height: '100%', textAlign:"center"}}>Loading...</div>
)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWUF1l-lg4lsyStsd0C__oVkaTTYb_cjU',
  LoadingContainer: LoadingContainer
})(MapContainer);
