import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function Provider({ children }) {
  const [statePlanets, setStatePlanets] = useState();
  const [api, setApi] = useState(true);

  useEffect(() => {
    const getPlanetsApi = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseJSON = await response.json();
      const result = responseJSON.results;
      result.map((planet) => delete planet.residents);
      const data = await result;
      setStatePlanets(data);
      setApi(false);
      return result;
    };
    getPlanetsApi();
  }, []);

  const contextValue = {
    data: statePlanets,
  };

  return (
    <div>
      {api ? <h1 className="title">StarWars Planets</h1> : (
        <myContext.Provider value={ contextValue }>
          {children}
        </myContext.Provider>
      )}
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
