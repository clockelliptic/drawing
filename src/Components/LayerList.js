import React from 'react'
import { Action } from '../redux/modules/actions'

import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout';

import styled from 'styled-components'
import { Grid, Box } from 'grommet'
import { Radial } from 'grommet-icons'

const ListItem = ({ layer }) =>{
    const dispatch = useDispatch()
    const isSelected = layer.id === useSelector(state => state.Layers.selectedLayer.id)

    function handleSelect(){
        dispatch(Action.selectLayer(layer))
    }

    const ColorIndicator = styled(Radial)`
        height: 100%;
        padding: 0 5px 0 5px;
    `;

    const Info = styled.div`
        margin: auto 0 auto 10px;
        width: 100%
    `;

    const Item = styled.div`
        border-bottom: 1px solid rgba(0,0,0,0.8);
        background-color: ${props => props.isSelected ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
        overflow: hidden;
        height: 45px;
        display: flex;
        color: rgba(220,220,220,1);
    `;

    return (
        <Item onClick={ handleSelect } isSelected={ isSelected }>
            <Grid
                style={{"width":"100%"}}
                rows={['auto']}
                columns={['auto', 'auto', '34px']}
                gap="none"
                areas={[
                    { name: 'name', start: [0,0], end:[0, 0] },
                    { name: 'owner', start: [1,0], end:[1, 0] },
                    { name: 'colorSelect', start: [2,0], end:[2, 0] },
                ]}
            >
                <Info gridArea='name'>{`Layer ${layer.id}`}</Info>
                <Info gridArea='owner'>{`Owner ${layer.owner.slice(0,5)}`}</Info>
                <ColorIndicator gridArea='colorSelect' />
            </Grid>
        </Item>
    );
}

export const LayerList = props => {
    const {localLayers, selectedLayer} = useSelector(state => state.Layers)

    const ListFrame = styled(Box)`
        height: 100%;
        background: rgba(0,0,0,0.3);
        overflow-y: scroll;
    `;

    const ResponsiveGridLayout = styled(WidthProvider(Responsive))`
        margin: 0;
    `;

    const layouts = {
        md: localLayers.map((_, i) => ({i: `${i}`, x: 0, y: i, w: 1, h: 1 }))
    }
    const listItems = localLayers.map((layer, i) => <ListItem key={`layerListItem${i}`} layer={layer} />)

    return (
        <ListFrame>
            <ResponsiveGridLayout
            className="LayersList"
            layouts={layouts}
            breakpoints={{md: 0}}
            cols={{md:1}}
            rowHeight={10}
            margin={[2, 2]}
            containerPadding={[10,10]}
            isDraggable={false}
            >

                { listItems }

            </ResponsiveGridLayout>
        </ListFrame>
    )
}