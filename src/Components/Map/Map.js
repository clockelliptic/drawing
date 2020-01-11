import React from 'react'
import styled  from 'styled-components'
import SVG from 'react-inlinesvg'
import _Map from './summonersrift.svg'

const Summoners = styled(SVG)`
/*
  & > g > #Jungle * {
    stroke: #ff0;
  }

  & > g > #Jungle #Blastcone1 {
    fill: #ffF !important;
  }

  & > g > #BlueObjectives * {
    stroke: #00f;
  }

  & > g > #RedObjectives * {
    stroke: #f00;
  }

  & > g > #RedObjectives * {
    stroke: #f00;
  }

  & > g > #RedObjectives * > #Base3 > #Mid2 {
    stroke: #f00;
    display: none;
  }
*/
`;

const Map = () => <Summoners src={_Map} />

export default Map;