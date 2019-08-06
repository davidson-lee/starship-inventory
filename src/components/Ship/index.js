import React from 'react'

const Ship = ({ ship, number }) => {
    return (
        <div className='ship'>
            <strong>{ship.name}</strong>
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