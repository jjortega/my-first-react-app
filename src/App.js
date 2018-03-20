import React, { Component } from 'react';
import Space from './components/Space';
import Cosmonaut from './components/Cosmonaut';
import './App.css';
import { get as HTTPget } from './utils/http';
const dataURL = 'http://www.howmanypeopleareinspacerightnow.com/peopleinspace.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      number: 0,
      people: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.setState( { loading: true, number: 0, people: [] }, () =>
      HTTPget(dataURL).then(({ number, people }) => this.setState({
        loading: false,
        number,
        people,
      }))
    );
  }
  render() {
    const {
      loading,
      number,
      people,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            { loading ?
              'Loading, please wait...' :
              <span>There are <strong>${ number }</strong> people in space right now</span>
            }
          </h1>
          { loading ? null : <button onClick={this.fetchData}>Maybe there are new people in space... Refresh!</button> }
        </header>
        <Space>
          { people.map(person =>
            <Cosmonaut key={person.name} {...person} />
          )}
        </Space>
      </div>
    );
  }
}

export default App;
