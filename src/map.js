import React from 'react';
import {
  LayerControls,
  MapStylePicker,
  CONTROLS
} from './controls';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import renderLayers from './layers'
import originalData from './latest_pos';
import { MapController } from '@deck.gl/core';
import { FlyToInterpolator } from 'deck.gl';


// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = '';


let malaysiaState = {
  longitude: 101.9758,
  latitude: 4.2105,
  zoom: 5,
  maxZoom: 16,
  pitch: 50,
  bearing: 0,
  area: 'malaysia',
  transitionInterpolator: new FlyToInterpolator(),
  transitionDuration: 8000,
  tranistionEasing: 200,
};

let bostonState = {
  longitude: -71.0589,
  latitude: 42.3601,
  zoom: 5,
  maxZoom: 16,
  pitch: 50,
  bearing: 0,
  transitionInterpolator: new FlyToInterpolator(),
  transitionDuration: 8000,
  tranistionEasing: 200,
  area: 'boston',
};

let europeState = {
    longitude: 2.3522,
    latitude: 48.8566,
    zoom: 5,
    maxZoom: 16,
    pitch: 50,
    bearing: 0,
    transitionInterpolator: new FlyToInterpolator(),
    transitionDuration: 8000,
    tranistionEasing: 200,
    area: 'europe',
};


class MapApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: 'mapbox://styles/mapbox/dark-v9',
      hover: {
        x: 0,
        y: 0,
        hoveredObject: null
      },
      viewState: {
        longitude: 2.3522,
        latitude: 48.8566,
        zoom: 5,
        maxZoom: 16,
        pitch: 50,
        bearing: 0,
        area: 'europe',
      },
      locationPoints: {},
      settings: Object.keys(CONTROLS).reduce(
        (accu, key) => ({
          ...accu,
          [key]: CONTROLS[key].value
        }),
        {}
      ),
    }

  }

  fetchData = async () => {
    const username = 'mat'
    const password = 'xcjM6Hx=#x-b8SnW'
    let api_call = await fetch('http://localhost:8080/subMsgs', {
      'headers': {
        // 'credentials': 'include',
        'Authorization': `Basic ${btoa(`${username}:${password}`).toString()}`,
      }
    })
    let data = await api_call.json();
    console.log(data);
  };
  

  onStyleChange = style => {
    this.setState({ style });
  };
  _updateLayerSettings(settings) {
    this.setState({ settings });
  };

  changeViewState = () =>{
    if (this.state.viewState.area == 'europe'){

    setTimeout(() => {
      this.setState({
      viewState: malaysiaState
    })
  }, 10000);}
  else if (this.state.viewState.area == 'malaysia'){
    setTimeout(() => {
      this.setState({
      viewState: bostonState
    })
  }, 10000);
}
  else {
    setTimeout(() => {
      this.setState({
      viewState: europeState
    })
  }, 20000);
};  
    
  
}

  // runs calculateDate function when the page loads
  componentDidMount() {
    this.fetchData()
    this.calculateData();
    
    // this.changeViewStateBoston()
  }



  // pulls data from source and adds it to the state in the required format
  calculateData = () => {
    let newData = {
      coordinates: []
    }
    for (let i = 0; i < originalData.data.length; i++) {
      let lat = parseFloat(originalData.data[i].lat)

      let lng = parseFloat(originalData.data[i].lng)

      newData.coordinates.push([lng, lat])
    }
    delete this.state.locationPoints
    
    this.setState({ locationPoints: newData.coordinates })
    newData.coordinates = []
    
  }
  _onViewportChange = viewState => {
    this.setState({ viewState });
  };


  render() {
    const { viewState } = this.state

    //changeViewState will loop indefinetly if it is in the render 
    this.changeViewState()
    return (
      <div>

        <MapStylePicker onStyleChange={this.onStyleChange} currentStyle={this.state.style} />

        <LayerControls
          settings={this.state.settings}
          propTypes={CONTROLS}
          onChange={settings => this._updateLayerSettings(settings)}
        />

        <DeckGL
          initialViewState={viewState}
          viewState={viewState}
          controller={MapController}
          layers={renderLayers({
            data: this.state.locationPoints,
            settings: this.state.settings
          })}
        >

          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle={this.state.style}
          />

        </DeckGL>

      </div>
    );
  }
}

export default MapApp