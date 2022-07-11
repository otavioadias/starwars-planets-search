import React from 'react';
import Provider from './context/myProvider';
import './App.css';
import Table from './components/table';

function App() {
  return (
    <Provider>
      <h3 className="title">Star Wars Planets</h3>
      <Table />
    </Provider>
  );
}

export default App;
