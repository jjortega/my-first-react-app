This is a small sample React application, intended to be built step-by-step. You should need no previous knowlegde of React and very little JavaScript to get started.

It is intended as a technology overview, not a formal training.

## Preparation: Project setup

If you are reading this locally, this stage may be already done. You have two alternative ways to get started:

### The docker way

If you already have `docker` and `docker-compose` in your machine, and don't want to install a `node` runtime, the easiest thing to do is:

```sh
git clone https://github.com/rafaelgg/my-first-react-app.git
cd my-first-react-app
docker-compose up --build
```

### The node way

If you already have `node` in your machine, and don't want to mess with that docker thing, better go this way:

```sh
git clone https://github.com/rafaelgg/my-first-react-app.git
cd my-first-react-app
npm install -g yarn
yarn install
yarn start
```

Either way, if everything went alright you can now point your browser to `http://localhost:3000/` and get started

## Stage 0: Getting to know React

Some things make React unique in the JS frontend library / framework sea. In no particular order:

- React is just a UI library
- React aims to be coded in pure JavaScript
- React can target the DOM, or others
- React is component based
- React is declarative
- React presents one-way binding
- React is production ready

Now, open the `src/App.js` file with your favorite editor.

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

Notice the strange syntax, that's *JSX*, a JS extension to make declarative interfaces easily, declaring component instanciation in a way similar to HTML tags.

But **WAIT!** You said that React "aims to be coded in pure JavaScript" and we already have an extension?

Yeah, maybe that should have been clearer: React code is written in pure JS (that means, no HTML or CSS unless you want it). Actually JSX is _similar_ to HTML in syntax, but does NOT generate HTML, but rather pure JS.

The code above is transpiled to:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(
        'header',
        { className: 'App-header' },
        React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
        React.createElement(
          'h1',
          { className: 'App-title' },
          'Welcome to React'
        )
      ),
      React.createElement(
        'p',
        { className: 'App-intro' },
        'To get started, edit ',
        React.createElement(
          'code',
          null,
          'src/App.js'
        ),
        ' and save to reload.'
      )
    );
  }
}

export default App;
```

Which is, indeed, pure JavaScript. React can target several platforms, one of which (the most popular) is the DOM in your browser. But that's far from the only one, you can also use `react-native` to create native mobile apps and work is ongoing to create native desktop apps in Windows, Mac and Linux. Since the code is written in pure JS, you just have to create components and a libray to render on that platform (`ReactDOM` is the one for web apps).

Change the code in `src/App.js` a bit and see how the resulting application works. Then let's proceed to the next stage.

## Stage 1: JSX

To prove how JSX interoperates seamlessly with JS, we are going to use a typical scenario of transversing through nested lists and printing stuff on screen.

First our data:

```js
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
```

List all the teams:

```jsx
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
```

List the teams, sorted by number of developers:

```jsx
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
```

List teams with a certain characteristic:

```jsx
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
```

Print a warning if any teams fail to meet a condition:

```jsx
        <p className="Teams">
          { teams.every(team => team.pds.length >= 1) ?
            <span>Hooray! Every team has at least one PD! We are safe!</span> :
            <span>Oh no! Some teams do not have a PD! Go hire some more!</span>
          }
        </p>
```

Transverse the teams to find the total team members by role:

```jsx
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
```

### Exercise 1

- We want to replicate http://www.howmanypeopleareinspacerightnow.com/
- With our own CSS style, showing whatever info you want
- Grab the current data from here (put it inside the src folder): http://www.howmanypeopleareinspacerightnow.com/peopleinspace.json
- Tip: think about how to import a JSON file to your code
- Ask questions if needed

