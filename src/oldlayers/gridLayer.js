import {ScreenGridLayer} from '@deck.gl/aggregation-layers';
import locationData from './data.json';


const Gridlayer = new ScreenGridLayer({
  
    id: 'screen-grid-layer',
    data: locationData,
    pickable: true,
    opacity: 0.8,
    cellSizePixels: 20,
    gpuAggregation: true,
    aggregation: 'Sum',
    colorRange: [
      [0, 25, 0, 25],
      [0, 85, 0, 85],
      [0, 127, 0, 127],
      [0, 170, 0, 170],
      [0, 190, 0, 190],
      [0, 255, 0, 255]
    ],
    getPosition: d => [d[0], d[1]],
    getWeight: d => 5,
   
  });

  export default Gridlayer