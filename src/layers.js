import { ScatterplotLayer, HexagonLayer, ScreenGridLayer, IconLayer, HeatmapLayer } from 'deck.gl';
import iconAtlas from './placeholder.svg'
import GL from '@luma.gl/constants';

const COLOR1 = [0, 128, 255];

const HEATMAP_COLORS = [
  [16, 196, 0],
  [255, 255, 41],
  [255, 162, 41],
  [255, 33, 25],
];

const iconData =
  [
    { "name": 'Radius Fuel Cards. Pte. Ltd', "coordinates": [103.8212, 1.281470] },
    { "name": 'Radius Fuel Cards. Sdn. Bhd', "coordinates": [101.6943, 3.15166] },
    { "name": 'Head Office', "coordinates": [-2.4196, 53.0923] },
    { "name": 'UK Fuels Ipswich', "coordinates": [1.1582, 52.058343] },
    { "name": 'UK Fuels York', "coordinates": [-1.103090, 53.989067] },
    { "name": 'UK Telematics', "coordinates": [-2.928110, 53.044601] },
    { "name": 'Adam Phones Limited', "coordinates": [-0.255537, 51.481870] },
    { "name": 'Plant i Ltd', "coordinates": [-3.854760, 52.594849] },
    { "name": 'Radius Technology Centre', "coordinates": [-2.24667, 53.4779] },
    { "name": 'Diesel Card Ireland Limited', "coordinates": [-7.2048, 55.03554] },
    { "name": 'Carte Carburant Services SAS', "coordinates": [3.02317, 50.63505] },
    { "name": 'Belgian Fuel Card NV', "coordinates": [3.602047, 50.747] },
    { "name": 'Multiple Card Systems A/S', "coordinates": [11.807970, 55.211571] },
    { "name": 'Tankkarten Service GmbH', "coordinates": [13.378890, 52.523521] },
    { "name": 'Servizio Carte Carburanti Italia S.R.L', "coordinates": [9.366004, 45.613288] },
    { "name": 'Diesel Card Ireland Limited', "coordinates": [-7.798618, 53.078731] },
    { "name": 'Tarjeta De Servicios Flota Internacional S.L.', "coordinates": [-0.445323, 39.531116] },
    { "name": 'Dieselkort Skandinavien AB', "coordinates": [12.979700, 55.580184] },
    { "name": 'Fuel Card Service International LDA', "coordinates": [-9.139043, 39.395800] },
    { "name": 'Diesel Card Service BV', "coordinates": [11.769117, 124.889144,] },
    { "name": 'Radius Fleet Services Inc', "coordinates": [-71.116604, 42.486210] },
  ]

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 700, height: 512, mask: false }
};


const elevationRange = [0, 1000];

export default function renderLayers(props) {
  const { data, settings } = props;
  return [
    settings.showScatterplot && new ScatterplotLayer({
      id: 'scatter-plot',
      getPosition: d => [d[0], d[1]],
      getRadius: d => 5,
      radiusScale: 1,
      radiusMinPixels: 2,
      radiusMaxPixels: 100,
      getFillColor: COLOR1,
      radius: 500,
      opacity: .4,
      pickable: true,
      data,
      ...settings

    }),
    settings.showHexagon &&
    new HexagonLayer({
      id: 'heatmap',
      colorRange: HEATMAP_COLORS,
      elevationScale: 350,
      upperPercentile: 100,
      highPrecision: true,
      coverage: 2,
      gpuAggregation: true,
      extruded: true,
      getPosition: d => [d[0], d[1]],
      opacity: 0.8,
      elevationRange,
      pickable: true,
      data,
      ...settings
    }),
    settings.showGridplot && new ScreenGridLayer({
      id: 'screen-grid-layer',
      pickable: true,
      opacity: 0.3,
      cellSizePixels: 10,
      gpuAggregation: true,
      aggregation: 'Sum',
      colorRange: [
        [16, 196, 0],
        [255, 255, 41],
        [255, 162, 41],
        [255, 33, 25],
      ],
      getPosition: d => [d[0], d[1]],
      getWeight: d => 5,
      data,
      ...settings
    }),
    settings.showIcon && new IconLayer({
      id: 'icon-layer',
      data: iconData,
      pickable: true,
      billboard: true,
      getPosition: d => d.coordinates,
      getScale: 1,
      sizeUnits: 'meters',
      getSize: 250,
      sizeMinPixels: 60,
      opacity: .8,
      iconAtlas: iconAtlas,
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',

      ...settings
    }),
    settings.showHeat && new HeatmapLayer({
      id: 'heatmapLayer',
      getPosition: d => [d[0], d[1]],
      colorRange: [
        [102, 204, 255],
        [0, 102, 255],
        [204, 255, 255],
        [255, 255, 255],
      ],
      gpuAggregation: true,
      intensity: .5 ,
      threshold: .05,
      radiusPixels: 30,
      getWeight: 20, 
      data,
      ...settings

    }),
    // settings.showGrid && new GridLayer({
    //   id: 'new-grid-layer',
    //   pickable: true,
    //   extruded: true,
    //   cellSize: 700,
    //   elevationScale: 300,
    //   cellSizePixels: 10,
    //   coverage: 30,
    //   getPosition: d => [d[0], d[1]],
    //   data,
    //   ...settings
    // }),

  ];
}
