import React from 'react';
import DeckGL from '@deck.gl/react';
import {IconLayer} from '@deck.gl/layers';

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
};

const data = 
[
  {name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [-122.466233, 37.684638]}
]

const Iconlayer = new IconLayer({
  id: 'icon-layer',
  data: data,
  pickable: true,
  // iconAtlas and iconMapping are required
  // getIcon: return a string
  iconAtlas: 'src/icon-atlas.png',
  iconMapping: ICON_MAPPING,
  getIcon: d => 'marker',
  sizeScale: 15,
  getPosition: d => d.coordinates,
  getSize: d => 5,
  getColor: d => [Math.sqrt(d.exits), 140, 0],
  
});

export default Iconlayer