import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const Table = () => {
  const aColumn = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const { data } = useContext(myContext);
  const [valueFilter, setValueFilter] = useState('');
  const [arrayValue, setArrayValue] = useState([]);
  const [columnValue, setColumnValue] = useState(aColumn[0]);
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
      <label htmlFor="name-filter" className="containeFilter">
        <img src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/star-trek-romulan-ship.png" alt=" Star Trek Romulan Ship" widht="10px" />
        <input
          className="filter"
          type="text"
          placeholder="Pesquise o planeta pelo nome"
          data-testid="name-filter"
          id="name-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </label>
      <section className="containerNumericFilter">
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
            {aColumn.map((opt) => (
              !arrayValue.find((op) => (
                op.column === opt
              ))
            && <option key={ opt } value={ opt }>{opt}</option>
            ))}
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
          className="btnSearch"
          data-testid="button-filter"
          onClick={ (index) => {
            onChange();
            const cloneColumn = [...aColumn];
            cloneColumn.splice(index, 1);
            setColumnValue(cloneColumn[0]);
          } }
        >
          {/* Filtrar */}
        </button>
      </section>
      <section className="filters">
        {arrayValue?.map((fil, index) => (
          <ul key={ index } className="ulFilters">
            <li key={ index } data-testid="filter">
              {fil.column}
              {' '}
              |
              {' '}
              {fil.comparison}
              {' '}
              |
              {' '}
              {fil.value}
              {' '}
            </li>
            <button
              type="button"
              className="cleanFilter"
              data-testid="clean-filter"
              onClick={ () => {
                const cloneArray = [...arrayValue];
                cloneArray.splice(index, 1);
                setArrayValue(cloneArray);
              } }
            >
              {/* x */}
            </button>
          </ul>
        ))}
      </section>
      <div className="btnDeleteAll">
        <button
          type="button"
          className="cleanAll"
          data-testid="button-remove-filters"
          onClick={ () => setArrayValue([]) }
        >
          {/* Remover Filtros */}
        </button>
      </div>
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
        <tfoot>
          <td>
            <a target="_blank" href="https://icons8.com/icon/IPavR3bWDw81/star-trek-romulan-ship" rel="noreferrer">Star Trek Romulan Ship icon by Icons8</a>
          </td>
          <td>
            <a target="_blank" href="https://icons8.com/icon/FinfCznQLOCV/dor-da-pesquisa" rel="noreferrer">Dor da pesquisa icon by Icons8</a>
          </td>
          <td>
            <a target="_blank" href="https://icons8.com/icon/104401/remover" rel="noreferrer">Remover icon by Icons8</a>
          </td>
          <td>
            <a target="_blank" href="https://icons8.com/icon/1504/menos" rel="noreferrer">Menos icon by Icons8</a>
          </td>
        </tfoot>
      </table>
    </myContext.Provider>
  );
};

export default Table;
