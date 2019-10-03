import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import locationData from './data.json';



// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF0aGV3YnJ5YW4iLCJhIjoiY2p6Mm42djVsMDdmaDNjbHU5azM1Z2h6eSJ9.6p76dcC4NJhKb-0k1I6YKw';
const COLOR1 = [0, 128, 255];
const COLOR2 = [255, 0, 128];

// const DATA_URL = locationData


const INITIAL_VIEW_STATE = {
  longitude: -2.24,
  latitude: 53.48,
  zoom: 3,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

export class ScatterApp extends Component {
  _renderLayers() {
    const {
      data = locationData,
      radius = 3,
      maleColor = COLOR1,
      femaleColor = COLOR2
    } = this.props;

    return [
      new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: radius,
        radiusMinPixels: 1,
        getPosition: d => [d[0], d[1]],
        getFillColor: COLOR1,
        getRadius: 1,
        opacity: 1,
        pickable: true,
        updateTriggers: {
          getFillColor: [maleColor, femaleColor]
        }
      })
    ];
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    return ( 
      <DeckGL layers={this._renderLayers()} initialViewState={INITIAL_VIEW_STATE} controller={true}>
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          
        />
      </DeckGL>
    );
  }
}

export function renderToDOM(container) {
  render(<ScatterApp />, container);
}
  

export default ScatterApp

