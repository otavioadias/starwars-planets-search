import React from 'react';
import Provider from './context/myProvider';
import './App.css';
import Table from './components/table';

function App() {
  return (
    <Provider>
      <h3 className="title">StarWars Planets Loading...</h3>
      <Table />
    </Provider>
  );
}

export default App;
