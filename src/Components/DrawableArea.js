import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Action } from '../redux/modules/actions'
import { Drag } from '@vx/drag';

const useDrawable = (dispatch) => { /* CUSTOM REDUX-REACT HOOK */
    const updateLayer = Action.updateLayerData
    return { /* note: `layer` is the currently selected layer */
        onDragStart: (layer) => ({x, y}) => dispatch(updateLayer(layer, [{ x: x, y: y }])),
        onDragMove: (layer) => ({x, y, dx, dy}) =>  dispatch(updateLayer(layer, [{ x: x+dx, y: y+dy }])),
        onDragEnd: (layer) => ({x, y}) => dispatch(updateLayer(layer, [{ x: x, y: y }])),
    }
}

export const DrawableArea = props => {
    const {selectedLayer} = useSelector(state => state.Layers)
    const {width, height} = useSelector(state => state.Canvas.size)
    const {onDragStart, onDragMove, onDragEnd} = useDrawable(useDispatch())

    return (
        <Drag
            width={width}
            height={height}
            resetOnStart={true}
            onDragStart={onDragStart(selectedLayer)}
            onDragMove={(selectedLayer.type==="Pencil") ? onDragMove(selectedLayer) : ()=>{}}
            onDragEnd={(selectedLayer.type==="Pencil") ? onDragEnd(selectedLayer) : ()=>{}}
        >
            {
                makeCurrentLine(width, height)
            }
        </Drag>
    )
}


const makeCurrentLine = (width, height) => ({ x, y, dx, dy, isDragging, dragStart, dragEnd, dragMove }) => {
    const DrawingIndicator = () => ( isDragging && (
        /*   VISUAL INDICATORS of line start and/or line end while drawing   */
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
        /*    RECEIVES DRAWING INPUT    */
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
