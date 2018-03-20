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

## Stage 2: Components

*Stage 1* shows an ok way to develop a web, but it puts all the info in the same file. A key concept of React is **Components**: a way to divide the code so that it's composable and atomic. We will learn about *Components* in this stage.

Components are handed down `props` from their parent. If a component renders something only depending on its props we can say it's a "pure" component. Pure components are preferred. Components can also handle state, we will see this in the next stage. There's an additional concept called "High-order components", which wrap components, but are out of scope in this tutorial.

A component can be a JS(X) class, like `App` in the previous stage or the following file:

**src/components/Team/index.js**

```jsx
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Role from '../Role';

const roles = ['pms', 'pds', 'devs'];

// A component can be a class
class Teams extends PureComponent {
  render() {
    const {
      name,
      ...props,
    } = this.props;
    const total = roles
                  .map(role => props[role].length)
                  .reduce((a, b) => a+b, 0);

    return (
      <div className="Team">
        Team-{name} has a total of { total } members:
        { roles.map(role =>
          <Role
            name={role}
            members={props[role]}
          />
        ) }
      </div>
    );
  }
}

Teams.propTypes = {
  name: PropTypes.string.isRequired,
  pms: PropTypes.arrayOf(PropTypes.string),
  pds: PropTypes.arrayOf(PropTypes.string),
  devs: PropTypes.arrayOf(PropTypes.string),
};

Teams.defaultProps = {
  pms: [],
  pds: [],
  devs: [],
};

export default Teams;
```

See how `this.props` represents variable info that can be handed down to the component. Also notice the `PropTypes` bit. *PropTypes* are an optional feature of React, but they're highly recommended to avoid silly type error mistakes.

A component can also be a standard function, like the following example:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Or a simple function
const Role = ({ name, members }) => (
  <div className="Role">
    { members.length } { name.slice(0, -1).toUpperCase() }{ name.slice(-1) }:
    { members.length === 0 ? <em> No one!!!</em> : null }
    { members.length === 1 ? <em> Warning!!! Alone!</em> : null }
    <ul>
      { members.map(member => <li key={member}>{ member }</li>) }
    </ul>
  </div>
);

Role.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
};

Role.defaultProps = {
  members: [],
};

export default Role;
```

See how `props` in this case are just parameters to the function.

You can then instantiate these components as in the following example:

```jsx
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
```

Notice how the **Team** component uses the **Role** component. That's ok. We can also re-use the **Role** component independently. This is a key feature of components.

```jsx
        <p className="App-intro">
          Roles cross team:
        </p>
        <p className="Roles">
          { roles.map( role =>
            <Role
              key={role}
              name={role}
              members={
                teams
                .map(team => team[role])
                .reduce((a,b) => a.concat(b), [])
              }
            />
          ) }
        </p>
```

### Exercise 2

- Still on http://www.howmanypeopleareinspacerightnow.com/
- We want to clean-up our code and make composable components
- Suggested components for:
  - Space (to contain the rest)
  - Astronaut (or Cosmonaut)
  - Link
- Tip: think about the { children } prop and how to nest components
- Ask questions if needed

## Stage 3
Stateless components are great. If all components could be stateless, life would be much easier. Unfortunately life is complex and evil, and has a memory, so to reflect this sometimes components need to keep state.

We can add state to a class-based component just by declaring a **constructor** method and creating `this.state` there.

```jsx
  constructor(props) {
    super(props);
    this.state = {
      teams: initialTeams,
      unassigned: [],
      focusedTeam: 0,
    };
  }
```

State can be accessed by referring to **this.state**:

```js
  render() {
    const {
      teams,
      unassigned,
    } = this.state;
    // MORE
  }
```

State can now be changed by calling `this.setState` at any point in the component. This call is asynchronous and usually fired from event callbacks like **onClick** or **onChange**.

```jsx
              onClickMember={(name) => this.setState({
                unassigned: unassigned.concat(name),
                teams: Object.assign(teams, { [teamIndex]: {
                    name: team.name,
                    members: team.members.filter(member => member !== name)
                  }
                })
              })}
```

or:

```jsx
            onClickMember={(name) => this.setState({
              unassigned: unassigned.filter(member => member !== name),
              teams: Object.assign(teams, { [indexWithLeastMembers]: {
                  name: teamWithLeastMembers.name,
                  members: teamWithLeastMembers.members.concat(name),
                }
              })
            })}
```

Specifically for this problem we've implemented a new, flatter version of the data:

```js
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
```

And a component to showcase the new model:

```jsx
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Role from '../Role';

// A component can be a class
class FlatTeam extends PureComponent {
  render() {
    const {
      name,
      members,
      onClickMember,
    } = this.props;

    return (
      <div className="Team">
        Team-{name} has a total of { members.length } members:
        <Role
          name={'members'}
          members={members}
          onClickMember={onClickMember}
        />
      </div>
    );
  }
}

FlatTeam.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  onClickMember: PropTypes.func,
};

FlatTeam.defaultProps = {
  members: [],
  onClickMember: () => {},
};

export default FlatTeam;
```

We've also changed the **Role** component, so members can be clicked:

```jsx
const Role = ({ name, members, onClickMember }) => (
  <div className="Role">
    { members.length } { name.slice(0, -1).toUpperCase() }{ name.slice(-1) }:
    { members.length === 0 ? <em> No one!!!</em> : null }
    { members.length === 1 ? <em> Warning!!! Alone!</em> : null }
    <ul>
      { members.map(member => <li onClick={() => onClickMember(member)} key={member}>{ member }</li>) }
    </ul>
  </div>
);
```

And allowed you to click members in teams to remove them:

```jsx
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
```

You can also click members on the "Unassigned" list to assign them to the team with the least amount of mebers:

```js
    const minTeamMembers = Math.min(...teams.map(team => team.members.length));
    const indexWithLeastMembers = teams.findIndex(team => team.members.length === minTeamMembers);
    const teamWithLeastMembers = teams[indexWithLeastMembers];
```

```jsx
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
```

### Component life-cycle

This is a comprehensive list of the callbacks you can declare in a class-based React component:

**constructor**(_props_) is called when the component is first instantiated. It needs to call _super(props)_ and doesn’t have _this.state_ set yet.

**componentWillMount**() is fired before the component is “mounted” (inserted into the DOM), but before the first _render()_.

**componentDidMount**() is fired after the first _render()_. Usually you setup your component here.

**componentWillReceiveProps**(_nextProps_)
**shouldComponentUpdate**(_nextProps_, _nextState_) => _boolean_
**componentWillUpdate**(_nextProps_, _nextState_)
**render**()
**componentDidUpdate**(_prevProps_, _prevState_)

		These are fired in this order when a component receives new props or changes its state

**componentWillUnmount**() is fired right before a component is destroyed. Useful to remove timers, subscriptions, requests…

**componentDidCatch**(_error_, _info_) is fired if there’s an error

You can access **this.state** and **this.props** in these lifecycle callbacks.

### Exercise 3

- Still on http://www.howmanypeopleareinspacerightnow.com/
- But we don’t want a local JSON file, get dynamically from: http://www.howmanypeopleareinspacerightnow.com/peopleinspace.json
- WARNING: the URL is CORS restricted. Let's work around it.
- Ask questions if needed
- Tip: Fetching something in JS can feel strange, use this:

**src/utils/http.js**
```js
const CORS_ENDPOINT = 'http://cors.cancamusa.org/';
const CORS_AUTH = 'Basic b250cnVjazpPblRydWNrT2Zmc2l0ZTY2Ng==';

const get = (url) => (
  fetch(CORS_ENDPOINT + url, { headers: new Headers({ 'Authorization': CORS_AUTH }) })
  .then(result => result.json())
);

export {
  get,
};
```

