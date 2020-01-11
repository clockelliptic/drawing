import React from 'react';
import styled  from 'styled-components'
import { LinePath } from '@vx/shape';
import { Drag } from '@vx/drag';
import { LinearGradient } from '@vx/gradient';
import Map from '../Map/Map.js'

import { Circle } from '@vx/shape';
import { Group } from '@vx/group';
import { curveCardinal as CURVE } from '@vx/curve';
import { scaleLinear } from '@vx/scale';

export default class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      curPoint: { x: 0, y:0 }
    };

    this.onDragMove = this.onDragMove.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.makeCurrentLine = this.makeCurrentLine.bind(this)

    const xMax = this.props.width;
    const yMax = this.props.height - 80;

    this.xScale = scaleLinear({
      domain: [0, 1],
      range: [0, xMax],
      clamp: true
    });
    this.yScale = scaleLinear({
      domain: [0, 1],
      range: [yMax, 0],
      clamp: true
    });
  }

  onDragStart({ x, y }){
    // add the new line with the starting point
    this.setState((state, props) => {
      const point = { x: x, y: y };
      console.log("START: ", point)
      return { curPoint: point };
  });
  }

  onDragMove({ x, y, dx, dy }) {
    // add the new point to the current line
    this.setState((state, props) => {
        const point = { x: x+dx, y: y+dy };
        console.log("DRAG: ", point, dx, dy)
        return { curPoint: point };
    });
  }

  onDragEnd({ x, y }){
    // add the new point to the current line
    this.setState((state, props) => {
      const nextData = [...state.data].concat([this.state.curPoint]);
      console.log("END: ", this.state.curPoint)
      return { data: nextData };
  });
  }

  makeCurrentLine({ x, y, dx, dy, isDragging, dragStart, dragEnd, dragMove }) {
      const { width, height } = this.props;

      const DrawingIndicator = () => ( isDragging && (
          /* visual indicators of line start and line end while drawing */
        <g>
          <circle
            fill="none"
            stroke="white"
            width={8}
            height={8}
            cx={x + dx}
            cy={y + dy}
            r={3}
            style={{ pointerEvents: 'none' }}
          />
        </g>
      )
    );

      const DrawingArea = () => (
          /* element to receive drawing input */
        <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={dragEnd}
            onMouseMove={dragMove}
            onTouchStart={dragStart}
            onTouchEnd={dragEnd}
            onTouchMove={dragMove}
        />
      );
      return (
        <g>
          <DrawingIndicator />
          <DrawingArea />
        </g>
      );
  }

  render() {
    const { width, height } = this.props;

    const Canvas = () => (
        <rect
            fill="#04002b"
            width={width}
            height={height}
            rx={14}
        />
    )

    const Lines = () =>
        [this.state.data].map((d, i) => (
          <LinePath
            key={`line-${i}`}
            fill={'transparent'}
            stroke="url(#stroke)"
            strokeWidth={3}
            data={function(){console.log("D", d); return d}()}
            curve={CURVE.tension(0.1)}
            x={d => d.x}
            y={d => d.y}
          />
        )
    )

    const Points = () =>
      <Group>
        {this.state.data.map((point, i) => {
          return (
            <Circle
              key={`point-${point.x}-${i}`}
              className="dot"
              cx={point.x}
              cy={point.y}
              r={1.5}
              fill="#ff2c34"//"#31c4f6"
              opacity={0.5}
            />
          );
        })}
      </Group>

    return (
      <div
        className="Draw"
        style={{
          touchAction: 'none',
          background: `no-repeat center/cover`,
          width:`600px`,
          height:`600px`,
          borderRadius: '15px'
        }}
      >
        <svg width={width} height={height}>

          <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />

          <Canvas />

          <Map />

          <Lines />

          <Points />

          <Drag
            width={width}
            height={height}
            resetOnStart={true}
            onDragStart={this.onDragStart}
            onDragMove={this.onDragMove}
            onDragEnd={this.onDragEnd}
          >
            { this.makeCurrentLine }
          </Drag>
        </svg>
      </div>
    );
  }
}