import React, { Component } from 'react';
import logo from './logo.svg';
import FlatTeam from './components/FlatTeam';
import Role from './components/Role';
import './App.css';

const initialTeams = [
  {
    name: 'Carriers',
    members: ['Javier', 'Nacho', 'Alvar', 'David', 'Dmitri', 'Iván', 'Martin', 'Vadim'],
  },
  {
    name: 'Shippers',
    members: ['Isa', 'Joa', 'Clau', 'Óscar', 'Alix', 'Antonio', 'H3', 'James', 'Nasi', 'Ricardo', 'Sotos'],
  },
  {
    name: 'Ops',
    members: ['Ramón', 'Carlos', 'Acei', 'Cas', 'Jose', 'Juan', 'Juanjo', 'Rach', 'Rafa', 'Rubén'],
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: initialTeams,
      unassigned: [],
      focusedTeam: 0,
    };
  }
  render() {
    const {
      teams,
      unassigned,
    } = this.state;

    const minTeamMembers = Math.min(...teams.map(team => team.members.length));
    const indexWithLeastMembers = teams.findIndex(team => team.members.length === minTeamMembers);
    const teamWithLeastMembers = teams[indexWithLeastMembers];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to OnTruck Engineering</h1>
        </header>
        <p className="App-intro">
          We have { teams.length } teams:
        </p>
        <div className="Teams">
          { teams.map( (team, teamIndex) =>
            <FlatTeam
              key={team.name}
              name={team.name}
              members={team.members}
              onClickMember={(name) => this.setState({
                unassigned: unassigned.concat(name),
                teams: Object.assign(teams, { [teamIndex]: {
                    name: team.name,
                    members: team.members.filter(member => member !== name)
                  }
                })
              })}
            />
          ) }
        </div>
        <p className="App-intro">
          Unassigned people:
        </p>
        <div className="Roles">
          <Role
            name={'Unassigned'}
            members={unassigned}
            onClickMember={(name) => this.setState({
              unassigned: unassigned.filter(member => member !== name),
              teams: Object.assign(teams, { [indexWithLeastMembers]: {
                  name: teamWithLeastMembers.name,
                  members: teamWithLeastMembers.members.concat(name),
                }
              })
            })}
          />
        </div>
      </div>
    );
  }
}

export default App;
