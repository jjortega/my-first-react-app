import React, { Component } from 'react';
import Space from './components/Space';
import Cosmonaut from './components/Cosmonaut';
import './App.css';
import space from './peopleinspace.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>There are <strong>{space.number}</strong> people in space right now</h1>
        </header>
        <Space>
          { space.people.map(person =>
            <Cosmonaut key={person.name} {...person} />
          )}
        </Space>
      </div>
    );
  }
}

export default App;
