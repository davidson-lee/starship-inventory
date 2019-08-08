import React from 'react'
import './index.css'

const Ship = ({ ship }) => {
    return (
        <div className='ship'>
            <h3>{ship.name}</h3>
            <br />
            <strong>Manufacturer: </strong>{ship.manufacturer}
            <br />
            <strong>Model: </strong>{ship.model}
            <br />
            <strong>Class: </strong>{ship.class}
            <br />
            <strong>Crew Size: </strong>{ship.crew}
            <br /><br />
        </div>
    )
}

export default Ship