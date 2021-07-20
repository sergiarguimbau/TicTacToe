# TicTacToe

A beginner friendly introduction to React Native. We'll explore laying out elements in React Native and adding some simple styling. Using Animated we'll create a simple animation for each move. Using AsyncStorage we'll save off X and O wins. Finally we'll convert the App class to take advantage of the new hooks in React.

## Fork Objectives

- Replace circle with white pawn
- Replace cross with black pawn
- Extend the board to 5x5
- Make the board resizeable

## How to run

This React Native project runs with Expo. It uses Expo V33.0.0 so it is recommended to use Expo CLI V4.1.3

### Install dependencies
```
yarn install
```

### Run Expo on Android
```
yarn android
```

### Run Expo on iOS
```
yarn ios
```

### Run Expo on web
```
yarn web
```

## Lessons

### Create The Game Board

We'll lay out a grid of squares and center it inside of the view.

### Header and Footer

We'll add in a header to display whose move it currently is and add a footer to display the number of wins each team has.

### Touch and Place Xs and Os

We'll use `ToucahbleOpacity` to allow users to tap on any open spot and render an X or O.

### Animate into Place

Using Animated we'll scale in an X or an O when a user taps on a square.

### Create a Win Screen

When the game is won or there are no more available moves we'll render a win overlay that will allow the user to restart the game.

### Save and Load Team Wins

Each time a team wins we'll persist the X and O wins to async storage so the next time the app is opened they will appear.

### Reset Wins Button

We'll add in a reset button to clear out our saved games as well as clear out the visible state.

### Convert To Hooks

We'll switch out the App as a class and convert it to take advantage of hooks. Including `useEffect` to load our saved game data, and `useState` to manage changing data.
