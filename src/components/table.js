import React, { useContext } from 'react';
import myContext from '../context/myContext';

const Table = () => {
  const { data } = useContext(myContext);
  console.log('data', data);

  return (
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
        { data.map((header) => (
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
  );
};

export default Table;
