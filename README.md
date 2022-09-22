# Moamen's Chess Game
## What is Chess Game?
This is a project I'm working on for fun and to practice React.

## Goals
  - Implement a fully functioning two-player chess game.
  - Once we do that, we can try our luck at creating a simple AI to play against human players.

## Currently Supported Features: 
  - All basic moves of each piece.
  - All basic boundary conditions (e.g. maximum limit for pieces such as Pawns).
  - Highlighting of possible paths of a selected piece when it's selected.

## Features To Be Added:
  - Enforcing turns.
  - Different states of play i.e. normal state, check state, checkmate.
  - En Passant (holy hell!)
  - Castling 
  - Promotion
  - A user interface that contains:
    - Indicator for whose player's turn. 
    - A side panel that collects captured pieces.
  - Add a main menu that has:
    - New Game, obviously.
    - Load and Save games, the games will be saved locally using Local Storage API, and loaded using authentication.
  - Advanced features:
    - Create a host server and allow online games between two players on two different PCs.
    - Allow users to create accounts, and create a scoreboard of each user.
    - Allow creating tournaments with their own scoreboards.
    - Make a simple AI with adjustable difficulty.
  
## Installation

The only dependency for chess game is bootstrap.
```sh
$ git clone https://github.com/MoamenMoatazYoussef/moamens-chess-game
$ cd moamens-chess-game
$ npm install react-bootstrap bootstrap
```

Then run it using npm:
```sh
$ npm start
```

## Want to contribute?
You can fork the project and work on it if you want, however I'm in the phase of redesigning it to make it less complex, so it's kind of a mess right now.

Since there is no full documentation of how this works yet, and this Readme isn't very descriptive of the steps I'm currently taken, if you are interested you can contact me at:
moamen.moataz.youssef@gmail.com

Or if you know me just call me, I'll reply back.

## Contributions
Moamen Moataz

# React stuff that was created and I didn't erase since I might need to look at it later
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
