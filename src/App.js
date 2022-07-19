import React from 'react';
import Provider from './context/myProvider';
import './App.css';
import Table from './components/table';

function App() {
  return (
    <Provider>
      {/* References for image = http://pa1.narvii.com/7653/791a8dcb1d64cd39ee7a8becf84e65e6de1767c8r1-500-190_00.gif */}
      <div className="containerImage">
        <img
          className="gifStarWars"
          src="starw.gif"
          alt="Gif StarWars"
        />
      </div>
      <Table />
    </Provider>
  );
}

export default App;
