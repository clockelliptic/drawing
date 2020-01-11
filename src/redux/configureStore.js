/* State Management & (side) Effects */
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { stateReducer } from './modules/state'
import { epicEffects } from './modules/epics'
import { usePusherUpdates } from './modules/side-effects'

/*
 * ***************************************************
 *   Redux DEV Tools --- Chrome Extension
 * ***************************************************
 */

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/*
 * ***************************************************
 *  Epic Middleware (RxJS Observable-based effect management)
 * ***************************************************
 */

const epicMiddleware = createEpicMiddleware()


/*
 * ***************************************************
 *  The Store - aka the main State-storing object, composed together with middleware
 * ***************************************************
 */

const store = createStore(
    stateReducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware),
    )
)

epicMiddleware.run(epicEffects)

/*
 * ***************************************************
 *  Loosely couple the Store with our relay server via Pusher
 * ***************************************************
 */

usePusherUpdates(store.dispatch)

export default store;