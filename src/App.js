import React, { useState, useEffect } from 'react';
import Ship from './components/Ship'
import './App.css';

const App = () => {
  const [data, setData] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    fetch('https://swapi.co/api/starships/?page=1')
      .then(res => res.json())
      .then(json => {
        const ships = json.results
        const reducedShips = ships.map(ship => {
          return {
            name: ship.name,
            model: ship.model,
            class: ship.starship_class,
            crew: ship.crew,
            manufacturer: ship.manufacturer
          }
        })
        setData(reducedShips)
      })
  }, [])

  const handleChange = e => {
    e.preventDefault()
    setSearchValue(e.target.value)
  }

  return (
    <main className="App">
      <h1>Starship inventory</h1>
      <input 
        id='search-field' 
        value={searchValue} 
        onChange={handleChange} 
        autoFocus={true} 
        placeholder='Search...'
        disabled={data === null ? true : false}
      />
      {data === null ? <h3>Loading...</h3> : data.map((el, i) => {
        return <Ship ship={el} key={el.name}/>
      })}
    </main>
  );
}

export default App;
