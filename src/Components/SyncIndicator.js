import React from 'react'
import { useSelector } from 'react-redux'
import { LinkUp, LinkDown } from 'grommet-icons'
import { Box } from 'grommet'

export const SyncIndicators = () => {
    const sendStatus = useSelector(state => state.Status.sendingData)
    const receiveStatus = useSelector(state => state.Status.receivingData)

    const sendColor = sendStatus ? 'var(--linkup)' : 'gray'
    const receiveColor = receiveStatus ? 'var(--linkdown)' : 'gray'

    return (
        <Box direction="row">
            <LinkUp size="small" color={sendColor} />
            <LinkDown size="small" color={receiveColor} />
        </Box>
    )
}