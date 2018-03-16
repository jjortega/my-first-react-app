This is a small sample React application, intended to be built step-by-step. You should need no previous knowlegde of React and very little JavaScript to get started.

It is intended as a technology overview, not a formal training.

## Stage 0: Project setup

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

