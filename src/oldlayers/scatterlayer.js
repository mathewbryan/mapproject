import { ScatterplotLayer } from 'deck.gl';
import locationData from './data.json';

let data = locationData
let radius = 3
const COLOR1 = [0, 128, 255];
const COLOR2 = [255, 0, 128];

const Scatterlayer = new ScatterplotLayer({
    id: 'scatter-plot',
    data,
    radiusScale: radius,
    radiusMinPixels: 1,
    getPosition: d => [d[0], d[1]],
    getFillColor: COLOR1,
    getRadius: 1,
    opacity: .2,
    pickable: true,
  });

  export default Scatterlayer

