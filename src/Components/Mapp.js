import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Action } from '../redux/modules/actions'

import { LinePath } from '@vx/shape';
import { LinearGradient, RadialGradient } from '@vx/gradient';
import { Circle } from '@vx/shape';
import { Group } from '@vx/group';
import { curveCardinal as CURVE } from '@vx/curve';

import { Box } from 'grommet'
import Map from './Map/Map.js'
import { DrawableArea } from './DrawableArea'


const useWindowResizeEvent = (dispatch) => {
    const resizeHandler = (e) => { dispatch(Action.resizeCanvas()) }

    useEffect(
      () => {
        window.addEventListener('resize', resizeHandler);

        return function cleanup() {
          window.removeEventListener('resize', resizeHandler)
        }
      }
    )
}

export const Mapp = props => {
    const {guestLayers, localLayers, selectedLayer} = useSelector(state => state.Layers)
    useWindowResizeEvent(useDispatch())
    const {width, height} = useSelector(state => state.Canvas.size)

    const CANVAS_SCALE = 1

    const Canvas = () => (
        <rect
            fill="url(#backgroundSphere)"
            strokeWidth={5}
            width={width*CANVAS_SCALE}
            height={height*CANVAS_SCALE}
            rx={"100%"}
        />
    );

    const Lines = () =>
        localLayers.map((layer, i) =>
            <LinePath
                key={`line-${layer.id}-${i}`}
                fill={'transparent'}
                stroke="url(#stroke)"
                strokeWidth={3}
                data={layer.data}
                curve={CURVE.tension(0.1)}
                x={d => d.x}
                y={d => d.y}
            />
        ).concat(guestLayers.map((layer, i) =>
            <LinePath
                key={`guestLine-${layer.id}-${i}`}
                fill={'transparent'}
                stroke="url(#stroke)"
                opacity={0.5}
                strokeWidth={3}
                data={layer.data}
                curve={CURVE.tension(0.1)}
                x={d => d.x}
                y={d => d.y}
            />
        ));

    const Points = () => (
        localLayers
            .filter(layer => layer.id===selectedLayer.id)
            .map((layer, i) =>
                <Group key={`pointGroup-${layer.id}-${i}`}>
                    {
                        layer.data.map((point, i) =>
                                <Circle
                                    key={`point-${layer.id}-${i}`}
                                    className="dot"
                                    cx={point.x}
                                    cy={point.y}
                                    r={2.}
                                    fill="#ff2c34"//"#31c4f6"
                                    opacity={0.8}
                                />
                        )
                    }
                </Group>
            )
    );

    return (
        <Box
          className="Draw"
          style={{
            touchAction: 'none',
          }}
        >
          <svg width={width*CANVAS_SCALE} height={height*CANVAS_SCALE}>

            <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />

            <RadialGradient id="backgroundSphere" from="transparent" to="#04002b" toOpacity={"40%"} fromOpacity={"60%"} fromOffset={"90%"} />

            <Canvas />

            <Map />

            <Lines />

            <Points />

            <DrawableArea />
          </svg>
        </Box>
    );
}