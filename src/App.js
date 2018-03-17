import React, { Component } from 'react';
import logo from './logo.svg';
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
        <p className="App-intro"></p>
        <p className="Teams">
          We have { teams.length } teams:
          <ul>
          { teams.map( ({ name, pms, pds, devs }) =>
            <li key={name}>
              Team { name } has { pms.length } PMs, { pds.length } PDs and { devs.length } Devs
            </li>
          )}
          </ul>
        </p>
        <p className="Teams">
          We have { teams.length } teams, sorted by number of developers:
          <ul>
          { teams.sort((a, b) => a.devs.length < b.devs.length ).map( ({ name, pms, pds, devs }) =>
            <li key={name}>
              Team { name } has { pms.length } PMs, { pds.length } PDs and { devs.length } Devs
            </li>
          )}
          </ul>
        </p>
        <p className="Teams">
          We have { teams.filter(team => team.pms.length > 1 ).length } team(s) with more than one PM, we need to split them:
          <ul>
          { teams.filter(team => team.pms.length > 1 ).map( ({ name, pms, pds, devs }) =>
            <li key={name}>
              Team { name } has { pms.length } PMs, { pds.length } PDs and { devs.length } Devs
            </li>
          )}
          </ul>
        </p>
        <p className="Teams">
          { teams.every(team => team.pds.length >= 1) ?
            <span>Hooray! Every team has at least one PD! We are safe!</span> :
            <span>Oh no! Some teams do not have a PD! Go hire some more!</span>
          }
        </p>
        <p className="Teams">
          We have a total of:
          <ul>
          { ['pms', 'pds', 'devs'].map(position =>
            <li key={position}>
              {
                teams
                .map(team => team[position].length)
                .reduce((a, b) => a+b, 0)
              } { position.slice(0, -1).toUpperCase() }{ position.slice(-1) }
            </li>
          )}
          </ul>
          For a grand total of { teams
            .map( ({ pms, pds, devs }) => [ ...pms, ...pds, ...devs ].length )
            .reduce((a, b) => a+b, 0)
          } team members
        </p>
      </div>
    );
  }
}

export default App;
