const todoFeatures = {
    map_builder: {
        'toolbar': {
            'create layer': [ 'freehand', 'autopath' ],
            'choose color': 'choose default new-layer color',
            'copy selected layer': '',
        },
        'layerList item features': {
            'delete layer': '',
            'layer color': '',
        },
        're-order layers': 'layerList items are draggable within list',
    },
    utilities: {
        'save copy': 'save copy of current map, convert all guest layers to personal layers',
        'import layers': 'import layers from another map file to current map file',
        'export map': 'export current map as svg or png file',
    },
    team: {
        'create & join teams': '',
        'team chat': 'chat & make map notes with your team',
    }
}



const appRoot = {
    node_modules: "all JS libraries, modules, etc.",
    public: "static build files such as index.html",
    server: {
        ".env": 'environment variables such as API keys, secrets, cluster info, & encryption config',
        "server.js": 'simple relay server that routes post requests from users to Pusher service and visa-versa'
    },
    src: {
        Components: {
            index: 'root app container and state context provider',
            Main: 'app gui layout',
            DrawableCanvas: 'observes user input and dispatches paint actions; shows view of user input',
            Map: 'displays the canvas itself',
            LayerList: 'displays existing layers and allows user to select working layer',
            Toolbar: 'create layer, delete layer, choose color, etc. via dispatched actions',
            SyncIndicators: 'indicators showing when data is being linked up / linked down from server'
        },
        redux: {
            modules: {
                "actions.js": 'strictly defines allowed allowed action-types & action-creators',
                "epics.js": 'functional-reactive middleware that maps actions to actions and performs side-effects',
                "side-effects.js": 'defines all state-coupled side-effects, both performed & received --- incoming and outgoing async data',
                "state.js": 'defines state reducers for the app --- the heartbeat of the app'
            },
            utils: {
                "mockData.js": 'micro-utility for mock data & dev'
            },
            "config.js": 'configuration settings & initial state shape',
            "configureStore.js": 'configuration script - sets up store & composes together with middleware & side-effect management'
        }
    },
}