import { makeUserId } from './utils/mockData'

export const calcCanvasSize = () => {
    const [ww, wh] = [window.innerWidth/2, window.innerHeight]
    const dim = (ww > wh) ? wh : ww
    return dim*0.9
}

export const initialState = {
    Canvas: {
        size: {width: calcCanvasSize(), height: calcCanvasSize()}
    },
    Palette: {
        selectedColor: '',
        Colors: '',
    },
    Toolbar: {
        selectedTool: '',
        Tools: '',
    },
    Layers: {
        selectedLayer: undefined, //SHAPE: {id: 'layer id', owner: 'layer owner'}
        localLayers: [],
        guestLayers: []
    },
    Status: {
        sendingData: false,
        receivingData: false
    },
    Session: {
        userId: makeUserId(),
    }
}

export const pusherConfig = {
    KEY: '3119dd4a27bd972a12a1',
    CLUSTER: 'us2',
    ENDPOINT: 'https://agile-brushlands-35070.herokuapp.com/paint',
}
