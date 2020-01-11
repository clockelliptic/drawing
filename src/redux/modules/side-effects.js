import { GuestActionTypes } from './actions'

/* RxJS Operators & Utilities */
import { ajax } from 'rxjs/ajax'; //creates observable from ajax request


/* Websocket streaming utility */
import Pusher from 'pusher-js';
import { pusherConfig } from '../config'

/*
 * ***************************************************
 * ASYNC Side-effects
 * ***************************************************
 */

   // * SENDS DATA
   // *********    used in `epics.js`    ***********
export const postUpdate = (action) => ajax({
    url: pusherConfig.ENDPOINT,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      data: JSON.stringify(action)
    }
})

   // * RECEIVES DATA
   // ******    used in `configureStore.js`     *********
const pusher = new Pusher(pusherConfig.KEY, {
    cluster: pusherConfig.CLUSTER,
    forceTLS: true,
})

const channel = pusher.subscribe('painting');

export const usePusherUpdates = (dispatch) => {
    console.log("binding pusher `action` channel")
    channel.bind('action', (data) => {
        const guestAction = JSON.parse(data.data)

        const mapped_action = Object.assign(guestAction, { type: GuestActionTypes[guestAction.type] })
        console.log("mapped action from server", mapped_action)
        dispatch( mapped_action )
    });
}