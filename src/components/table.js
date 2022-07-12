import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const Table = () => {
  const { data } = useContext(myContext);
  const [valueFilter, setValueFilter] = useState('');
  const [arrayValue, setArrayValue] = useState([]);
  const [columnValue, setColumnValue] = useState('population');
  const [comparisonValue, setComparisionValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);

  const lowerFilter = valueFilter.toLowerCase();

  const context = {
    filterByName: {
      name: valueFilter,
    },
    filterByNumericValues:
      {
        column: columnValue,
        comparison: comparisonValue,
        value: numberValue,
      },
    arrayValue,
  };

  const onChange = () => {
    setArrayValue((prev) => [...prev, context.filterByNumericValues]);
  };

  const filter = (d, n, a) => {
    let newArray = [...d];
    if (a !== undefined) {
      a.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          newArray = newArray.filter((i) => (i[column]) > Number(value));
          return newArray;
        case 'menor que':
          newArray = newArray.filter((i) => (i[column]) < Number(value));
          return newArray;
        case 'igual a':
          newArray = newArray.filter((i) => (i[column]) === value);
          return newArray;
        default:
          return false;
        }
      });
    }
    if (n) {
      return d.filter((planet) => (
        planet.name.toLowerCase().includes(lowerFilter)));
    }
    return newArray;
  };

  const filterArray = filter(data, valueFilter, arrayValue);

  return (
    <myContext.Provider value={ context }>
      <header className="filter">
        <input
          type="text"
          placeholder="Procure o planeta pelo nome"
          data-testid="name-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </header>
      <section>
        <label htmlFor="numericFilter">
          Coluna:
          <select
            className="numericFilter"
            id="numericFilter"
            data-testid="column-filter"
            name="column"
            value={ columnValue }
            onChange={ (e) => setColumnValue(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="operatorFilter">
          Operador:
          <select
            className="operatorFilter"
            id="operatorFilter"
            data-testid="comparison-filter"
            name="comparison"
            value={ comparisonValue }
            onChange={ (e) => setComparisionValue(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="numberFilter">
          Valor:
          <input
            type="number"
            className="operatorFilter"
            name="value"
            id="operatorFilter"
            data-testid="value-filter"
            value={ numberValue }
            onChange={ (e) => setNumberValue(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => onChange() }
        >
          Filtrar
        </button>
      </section>
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
          { filterArray.map((header) => (
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
