import React from 'react'
import styled from 'styled-components'

import underConstruction from "../assets/under-construction.gif"

const ConstructionImage = styled.img`

`

const Construction = () => {
    return (
        <ConstructionImage src={underConstruction} />
    )
}

export default Construction