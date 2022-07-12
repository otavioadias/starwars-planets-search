import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const Table = () => {
  const { data } = useContext(myContext);
  const [valueFilter, setValueFilter] = useState('');

  const lowerFilter = valueFilter.toLowerCase();

  const planetFilter = data.filter((planet) => (
    planet.name.toLowerCase().includes(lowerFilter)));

  const filterByName = {
    name: valueFilter,
  };

  return (
    <myContext.Provider value={ filterByName }>
      <header className="filter">
        <input
          type="text"
          placeholder="Procure o planeta pelo nome"
          data-testid="name-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </header>
      <table className="purpleHorizon">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planetFilter.map((header) => (
            <tr key={ header.created }>
              <td>{header.name}</td>
              <td>{header.rotation_period}</td>
              <td>{header.orbital_period}</td>
              <td>{header.diameter}</td>
              <td>{header.climate}</td>
              <td>{header.gravity}</td>
              <td>{header.terrain}</td>
              <td>{header.surface_water}</td>
              <td>{header.population}</td>
              <td>{header.films}</td>
              <td>{header.created}</td>
              <td>{header.edited}</td>
              <td>{header.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </myContext.Provider>
  );
};

export default Table;
