import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {ScreenGridLayer} from 'deck.gl';
import {isWebGL2} from '@luma.gl/core';
import locationData from './data.json';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWF0aGV3YnJ5YW4iLCJhIjoiY2p6Mm42djVsMDdmaDNjbHU5azM1Z2h6eSJ9.6p76dcC4NJhKb-0k1I6YKw' // eslint-disable-line

// Source data CSV
const DATA_URL =
  locationData ; 

const INITIAL_VIEW_STATE = {
  longitude: -2.24,
  latitude: 53.48,
  zoom: 9.6,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const colorRange = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255]
];

export class GridApp extends Component {
  _renderLayers() {
    const {data = DATA_URL, cellSize = 12, gpuAggregation = true, aggregation = 'Sum'} = this.props;

    return [
      new ScreenGridLayer({
        id: 'grid',
        data,
        getPosition: d => [d[0], d[1]],
        getWeight: d => 5,
        cellSizePixels: cellSize,
        colorRange,
        gpuAggregation,
        aggregation,
        pickable: true

      })
    ];
  }

  _onInitialized(gl) {
    if (!isWebGL2(gl)) {
      console.warn('GPU aggregation is not supported'); // eslint-disable-line
      if (this.props.disableGPUAggregation) {
        this.props.disableGPUAggregation();
      }
    }
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        onWebGLInitialized={this._onInitialized.bind(this)}
        controller={true}
      >
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
  render(<GridApp />, container);
}

export default GridApp