import React, { Component } from 'react';
import logo from './logo.svg';
import Team from './components/Team';
import './App.css';

const teams = [
  {
    name: 'Carriers',
    pms: ['Javier'],
    pds: ['Nacho'],
    devs: ['Alvar', 'David', 'Dmitri', 'Iván', 'Martin', 'Vadim'],
  },
  {
    name: 'Shippers',
    pms: ['Isa', 'Joa'],
    pds: ['Clau', 'Óscar'],
    devs: ['Alix', 'Antonio', 'H3', 'James', 'Nasi', 'Ricardo', 'Sotos'],
  },
  {
    name: 'Ops',
    pms: ['Ramón'],
    pds: ['Carlos'],
    devs: ['Acei', 'Cas', 'Jose', 'Juan', 'Juanjo', 'Rach', 'Rafa', 'Rubén'],
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to OnTruck Engineering</h1>
        </header>
        <p className="App-intro">
          We have { teams.length } teams:
        </p>
        <p className="Teams">
          { teams.map( team =>
            <Team
              key={team.name}
              name={team.name}
              pms={team.pms}
              pds={team.pds}
              devs={team.devs}
            />
          ) }
        </p>
      </div>
    );
  }
}

export default App;
