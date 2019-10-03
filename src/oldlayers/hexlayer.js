
import locationData from './data.json';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import { getMean } from '@deck.gl/aggregation-layers/dist/es5/utils/aggregation-operation-utils';

// Customise color range
// const HEATMAP_COLORS = [
//     [255, 255, 204],
//     [199, 233, 180],
//     [127, 205, 187],
//     [65, 182, 196],
//     [44, 127, 184],
//     [37, 52, 148]
//   ];


const Hexlayer = new HexagonLayer({
    id: 'hexagon-layer',
    data: locationData,
    pickable: true,
    extruded: true,
    coverage: 2,
    radius: 900,
    elevationScale: 400,
    upperPercentile: 100,
    pitch: 95,
    opacity: 1,
    highPrecision: true,
    getPosition: d => [d[0], d[1]],
    // onHover: ({object, x, y}) => {
    //   const tooltip = `${object.centroid.join(', ')}\nCount: ${object.points.length}`;
    //   /* Update tooltip
    //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    //   */
    })

    export default Hexlayer