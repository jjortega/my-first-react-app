import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import space from './peopleinspace.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>There are <strong>{space.number}</strong> people in space right now</h1>
        </header>
        <p className="People">
          { space.people.map(person =>
            <div class="Person" key={person.name}>
              <img class="Pic" src={person.biophoto} width={person.biophotowidth} height={person.biophotoheight} />
              <div class="Info">
                <div>{ person.title } { person.name } from <img title={person.country} class="Flag" src={person.countryflag} /></div>
                <div>At "{ person.location }" since { person.launchdate }</div>
                <div><em>{ person.bio }</em></div>
                <div class="Links">
                  { person.biolink ? <a href={person.biolink} target="_blank" rel="noopener">Bio</a> : null }
                  { person.twitter ? <a href={person.twitter} target="_blank" rel="noopener">Twitter</a> : null }
                </div>
              </div>
            </div>
          )}
        </p>
      </div>
    );
  }
}

export default App;
