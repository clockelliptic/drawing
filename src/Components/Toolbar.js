import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Action } from '../redux/modules/actions'

import { Grid, Box } from 'grommet'
import { ChapterAdd, Trash } from 'grommet-icons'
import styled from 'styled-components'

/*
 * Helper Functions
 */

const createLayer_Handler = (dispatch, owner) => {
    const newLayer = {
        id: Math.floor(Math.random()*100000),
        owner:owner,
        tool:'autopen',
        color:'#000',
        data:[]
    }

    dispatch(Action.addLayer(newLayer))
    dispatch(Action.selectLayer(newLayer))
}

const deleteLayer_Handler = (dispatch, selectedLayer) => {
    dispatch(Action.deleteLayer(selectedLayer))
}

/*
 * Toolbar Component
 */

export const Toolbar = () => {
    const dispatch = useDispatch()
    const selectedLayer = useSelector(state => state.Layers.selectedLayer)
    const sessionUser = useSelector(state => state.Session.userId)

    const Bar = styled(Box)`
        background: rgba(0,0,0,0.5);
    `;

    return (
        <Bar direction="row" >
            <Trash onClick={() => {deleteLayer_Handler(dispatch, selectedLayer)}} />
            <ChapterAdd onClick={() => {createLayer_Handler(dispatch, sessionUser)}} />
        </Bar>
    );
}

