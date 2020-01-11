import { calcCanvasSize } from '../config'
import { dispatch } from 'rxjs/internal/observable/pairs'

export const ActionTypes = {
    /*
     * Action types that describe local activities.
     */

    /* Canvas  */
    CANVAS_RESIZE: 'CANVAS_RESIZE',

    /* Palette */
    PALETTE_SELECT: 'PALETTE_SELECT',

    /* Toolbar */
    TOOL_SELECT: 'TOOL_SELECT',

    /* Layers */
    LAYER_ADD: 'LAYER_ADD',
    LAYER_DELETE: 'LAYER_DELETE',
    LAYER_UPDATE_DATA: 'LAYER_UPDATE_DATA',
    LAYER_UPDATE_COLOR: 'LAYER_UPDATE_COLOR',
    LAYER_SELECT: 'LAYER_SELECT',

    /* Remote data sync indicators */
    UPDATE_DATA_COMPLETE: 'UPDATE_DATA_COMPLETE',
    RECEIVING_DATA: 'RECEIVING_DATA',

}

export const Action = {
    /* Canvas */
    resizeCanvas: () => ({ type: ActionTypes.CANVAS_RESIZE, size: {width: calcCanvasSize(), height: calcCanvasSize()} }),
    /* Palette */
    selectColor: (color) => ({ type: ActionTypes.PALETTE_SELECT, color:color}),

    /* Toolbar */
    selectTool: (tool) => ({ type: ActionTypes.TOOL_SELECT, tool}),

    /* Layers */
    addLayer: (layer) => (Object.assign({ type: ActionTypes.LAYER_ADD, layer: layer },)),
    deleteLayer: (layer) => ({ type: ActionTypes.LAYER_DELETE, layer: layer}),
    updateLayerData: (layer, new_data) => ({ type: ActionTypes.LAYER_UPDATE_DATA, new_data:new_data, layer: layer}),
    udateLayerColor: (layer, color) => ({ type: ActionTypes.LAYER_UPDATE_COLOR, color:color, layer:layer}),
    selectLayer: (layer) => ({type: ActionTypes.LAYER_SELECT, layer:layer }),

    /* Syncing Data */
    sendDataUpdateFulfilled: () => ({ type: ActionTypes.UPDATE_DATA_COMPLETE }),
    receivingStatus: () => ({ type: ActionTypes.RECEIVING_DATA })
}


/*
 * **********************************************************
 * Actions describing SIDE-EFFECTS incoming from server.
 * **********************************************************
 */


export const GuestActionTypes = {
    /*
     * Action types that describe activities coming from server.
     *
     * Map local action types from remote server & dispatch like so:
     *
     *     const mapped_action = Object.assign(action, { type: GuestActionTypes[action.type] })
     *     dispatch( mapped_action )
     */

    /* Layers */
    LAYER_ADD: 'GUEST_LAYER_ADD',
    LAYER_DELETE: 'GUEST_LAYER_DELETE',
    LAYER_UPDATE_DATA: 'GUEST_LAYER_UPDATE_DATA',
    LAYER_UPDATE_COLOR: 'GUEST_LAYER_UPDATE_COLOR',
    LAYER_SELECT: 'GUEST_LAYER_SELECT',
}

export const GuestAction = {
        /* Layers */
        addLayer: (layer) => ({ type: GuestActionTypes.LAYER_ADD, layer: layer }),
        deleteLayer: (layer) => ({ type: GuestActionTypes.LAYER_DELETE, layerId: layer.id, layerOwner: layer.owner}),
        updateLayerData: (layer, new_data) => ({ type: GuestActionTypes.LAYER_UPDATE_DATA, new_data:new_data, layer:layer}),
        udateLayerColor: (pointer, color) => ({ type: GuestActionTypes.LAYER_UPDATE_COLOR, color:color, pointer:pointer}),
        selectLayer: (layer) => ({type: GuestActionTypes.LAYER_SELECT, layerId: layer.id, layerOwner: layer.owner}),
}