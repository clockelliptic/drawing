import React from 'react';
import './App.css';

import { Mapp } from '../Mapp'
import { LayerList } from '../LayerList'
import { Toolbar } from '../Toolbar'
import { SyncIndicators } from '../SyncIndicator'

import { Grommet, Grid, Box } from 'grommet'
import styled from 'styled-components'

export default function App() {

  const Title = styled(Box)`
    font-family: "bungee";
    font-size: 38px;
    line-height: 30px;
    color: white;
    margin: 1% auto 0 auto;
    width: 100%;
    text-align: center;
    z-index:101;
  `;

  const Indicators = styled(Box)`
    position: absolute;
    bottom: 5px;
  `;

  return (
    <Grommet style={{"height":"100vh"}}>
      <Grid
        fill={true}
        rows={['auto', 'xxsmall']}
        columns={['1/4', '1/2', '1/4']}
        gap="none"
        areas={[
          { name: 'title', start: [1,1], end: [1,1]},
          { name: 'leftPanel', start: [0,0], end:[0,1] },
          { name: 'centerPanel', start: [1,0], end:[1,0] },
          { name: 'rightPanel', start: [2,0], end:[2,1] }
        ]}
      >
      <Box gridArea="title">
        <Title>Playmaker Strategist</Title>
      </Box>

      <Box style={{"background":"rgba(0,0,0,0.3)"}} gridArea="rightPanel">
        <Indicators>
          <SyncIndicators />
        </Indicators>
      </Box>

      <Box gridArea="leftPanel">
          <Toolbar />
          <LayerList />
      </Box>

      <Box gridArea="centerPanel" align="center" justify="center">
        <Mapp />
      </Box>

      </Grid>
    </Grommet>
  );
}