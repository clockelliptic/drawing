import { ActionTypes, Action } from './actions'
import { ofType, combineEpics } from 'redux-observable';
import { postUpdate } from './side-effects'

/* RxJS Operators & Utilities */
import { mergeMap, map, catchError, debounceTime } from 'rxjs/operators';
import { of, fromEvent } from 'rxjs'




/*
 * ***************************************************
 * MAIN Epic
 *  Similar to state reducers, epics compose together.
 * ***************************************************
 */

export const epicEffects = (action$, state$, deps) => combineEpics(
  syncEpic,
)(action$, state$, deps).pipe(
  catchError((error, source) => {
    console.error("epic error: ", error);
    return source;
  })
);

/*
 * ***************************************************
 * Sub-tree Epics
 * ***************************************************
 */

const A = ActionTypes
const syncEpic = (action$, state$, deps) => action$.pipe(
  ofType(A.LAYER_ADD, A.LAYER_DELETE, A.LAYER_UPDATE_COLOR, A.LAYER_UPDATE_DATA),
  mergeMap((action) =>
    postUpdate(action).pipe( // `postUpdate()` is async!
      debounceTime(1000),
      map(ajax_response => { console.log("update posted", Action.sendDataUpdateFulfilled(), ajax_response); return Action.sendDataUpdateFulfilled() }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    )
  )
)


/*
 * ***************************************************
 *  EXAMPLE:
 *   Make observable stream from window/document/element event
 * ***************************************************
 */

//create observable that emits click events
const source = fromEvent(window, 'click');
//map to string with given event timestamp
const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));