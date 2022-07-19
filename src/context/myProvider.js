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
      {/* References for image = http://pa1.narvii.com/7653/791a8dcb1d64cd39ee7a8becf84e65e6de1767c8r1-500-190_00.gif */}
      {api ? (
        <div className="containerImage">
          <p>Loading</p>
          <img
            className="gifStarWars"
            src="starw.gif"
            alt="Gif StarWars"
          />
        </div>
      ) : (
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
