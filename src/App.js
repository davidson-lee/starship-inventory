import React, { useState, useReducer, useEffect } from 'react';
import Ship from './components/Ship'
import './App.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [sortAlpha, setSortAlpha] = useState(false)
  const [sortCrew, setSortCrew] = useState(false)

  const reducer = (state, action) => {
    switch(action.type) {
      case 'init':
        return action.payload
      case 'filteredData':
        return {...state, filteredData: action.payload}
      case 'sort':
        return {...state, filteredData: action.payload.filtered, sortedData: action.payload.sorted}
      default:
        throw new Error('Action type invalid');
    }
  }

  const initialState = {
    data: null,
    filteredData: null,
    sortedData: null
  }

  const [ships, dispatch] = useReducer(reducer, initialState)

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
        dispatch({type: 'init', payload: { data: reducedShips, filteredData: reducedShips, sortedData: reducedShips }})
      })
  }, [])

  useEffect(() => {
    const compareName = (a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
    }
    const compareCrew = (a, b) => {
        if (parseInt(a.crew) < parseInt(b.crew)) return -1
        if (parseInt(a.crew) > parseInt(b.crew)) return 1
        return 0
    }
    let toDisplay
    if (searchValue !== '' && ships.data !== null) {
      toDisplay = ships.data.filter(el => {
        return Object.values(el).some(e => {
          return(e.toLowerCase().includes(searchValue.toLowerCase()))
        })
      })
    } else {
      toDisplay = ships.data
    }
    if (sortAlpha || sortCrew) {
      const toSort = toDisplay.map(e => {return e})
      let sortedShips
      if (sortAlpha) {
        sortedShips = toSort.sort(compareName)
      }
      if (sortCrew) {
        sortedShips = toSort.sort(compareCrew)
      }
      dispatch({type:'sort', payload: { sorted: sortedShips, filtered: toDisplay }})
    } else {
      dispatch({type:'sort', payload: { sorted: toDisplay, filtered: toDisplay }})
    }
  }, [searchValue, ships.data, ships.filteredData, sortAlpha, sortCrew])

  const handleSearch = e => {
    e.preventDefault()
    setSearchValue(e.target.value)
  }

  const handleSort = e => {
    switch (e.target.id) {
      case 'alpha-checkbox':
        setSortAlpha(!sortAlpha)
        break;
      case 'crew-checkbox':
        setSortCrew(!sortCrew)
        break;
      default:
        throw new Error('Checkbox error')
    }
  }

  return (
    <main className="App">
      <h1>Starship inventory</h1>
      <input 
        id='search-field' 
        value={searchValue} 
        onChange={handleSearch} 
        autoFocus={true} 
        placeholder='Search...'
        disabled={ships.filteredData === null}
      />
      <div>
        <input 
          id='alpha-checkbox' 
          checked={sortAlpha}
          onChange={handleSort}
          type='checkbox'
          disabled={ships.filteredData === null}
        />
        <label>Sort by Name</label>
        <input 
          id='crew-checkbox' 
          checked={sortCrew}
          onChange={handleSort}
          type='checkbox'
          disabled={ships.filteredData === null}
        />
        <label>Sort by Crew</label>
      </div>
      <div className='ships-container'>
        {ships.filteredData === null 
          ? <h3>Loading...</h3> 
          : ships.sortedData.map((el, i) => {
              return <Ship ship={el} key={i} isSorted={sortAlpha}/>
            })
        }
      </div>
    </main>
  );
}

export default App;
