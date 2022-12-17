import React from 'react'
import Background from '../background'
import Character from '../character'

const Scene = ({ charID, bgID }) => {
    return (
        <>
            <Background bgID={bgID} />
            <Character charID={charID} restricted={{ top: 20, left: 5, right: 5, bottom: 5 }} />
        </>
    )
}

export default Scene