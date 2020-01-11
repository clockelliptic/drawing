import { ActionTypes, GuestActionTypes } from './actions'
import { initialState } from '../config'


/*
 * *********************************************************************************************************
 *                                        HELPER FUNCTIONS
 * *********************************************************************************************************
 */

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

const makeLayer = ({ id, owner, tool, color, data }) => ({
    owner: owner,
    id: id,
    tool: tool,
    data: data,
    color: color,
})

/*
 * *********************************************************************************************************
 *                                        SUB-TREE REDUCERS
 * *********************************************************************************************************
 */


    /* *****************************************************************************************************
     * FROM SERVER --- (effectful) remote view of guest activities ==> async state updates
     *//////////////////////////////////////////////////////////////////////////////////////////////////////

const updateGuestLayer = createReducer([], {
    [GuestActionTypes.LAYER_ADD]: (state, action) => state.concat([makeLayer(action.layer)]),
    [GuestActionTypes.LAYER_DELETE]: (state, action) => state.filter(layer => (layer.id !== action.layer.id) ),
    [GuestActionTypes.LAYER_UPDATE_DATA]: (state, action) => state.reduce((acc, layer) =>
        acc.concat([
            (layer.id!==action.layer.id)
                ? layer
                : {...layer, data: layer.data.concat(action.new_data)}
        ]),
    []),
    [GuestActionTypes.LAYER_UPDATE_COLOR]: (state, action) => state.reduce((acc, layer) => (layer!==action.layer) ? acc : {...layer, color: action.color}, []),
})

    /* *****************************************************************************************************
     * IN-BROWSER USER SESSION --- local view of session user's activities ==> synchronous state updates
     *//////////////////////////////////////////////////////////////////////////////////////////////////////

const updateCanvas = createReducer([], {
        [ActionTypes.CANVAS_RESIZE]: (state, action) => action.size,
    }
)

const updateLayer = createReducer([], {
    [ActionTypes.LAYER_ADD]: (state, action) => state.concat([makeLayer(action.layer)]),
    [ActionTypes.LAYER_DELETE]: (state, action) => state.filter(layer => (layer.id !== action.layer.id) ),
    [ActionTypes.LAYER_UPDATE_DATA]: (state, action) => state.reduce((acc, layer) =>{
        console.log(action.layer.id, layer.id)
        return acc.concat([
            (layer.id !== action.layer.id)
                ? layer
                : {...layer, data: layer.data.concat(action.new_data)}
        ])},
    []),
    [ActionTypes.LAYER_UPDATE_COLOR]: (state, action) => state.reduce((acc, layer) => (layer.id!==action.layer.id) ? acc : {...layer, color: action.color}, []),
})

const selectLayer = createReducer([], {
    [ActionTypes.LAYER_SELECT]: (state, action) => ({id: action.layer.id, owner: action.layer.owner}),
})

const selectColor = createReducer([], {
    [ActionTypes.PALETTE_SELECT]: (state, action) => action.color,
})

const selectTool = createReducer([], {
    [ActionTypes.TOOL_SELECT]: (state, action) => action.tool,
})

const syncData = createReducer([], {
    [ActionTypes.LAYER_UPDATE_DATA]: (state, action) => true,
    [ActionTypes.UPDATE_DATA_COMPLETE]: () => false,
})


/*
 * *********************************************************************************************************
 *                                        MAIN REDUCER
 * *********************************************************************************************************
 */

export const stateReducer = (state = initialState, action) => {
    return {
        Canvas: {
            size: updateCanvas(state.Canvas.size, action),
        },
        Palette: {
            selectedColor: selectColor(state.Palette.selectedColor, action),
            Colors: state.Palette.Colors
        },
        Toolbar: {
            selectedTool: selectTool(state.Toolbar.selectedTool, action),
            Tools: state.Toolbar.tools
        },
        Layers: {
            selectedLayer: selectLayer(state.Layers.selectedLayer, action),
            localLayers: updateLayer(state.Layers.localLayers, action),
            guestLayers: updateGuestLayer(state.Layers.guestLayers, action),
        },
        Status: {
            sendingData: syncData(state.Status.sendingData, action),
            receivingData: false,
        },
        Session: state.Session
    }
}