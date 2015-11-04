const alt = require('../altInstance');

const FieldActions = require('./Field');

const GameActions = alt.createActions({displayName: 'GameActions',
  gameStart: function() {
    return true;
  },

  gameOver: function() {
    return false;
  },

  turnOver: function() {
    return true;
  },

  expectedShipCount: function(count) {
    return count;
  },

  gameStateChange: function(state) {
    return state;
  },

  setupBoard: function(size) {
    return {
      playerOne: FieldActions.createFieldFor('playerOne', size),
      playerTwo: FieldActions.createFieldFor('playerTwo', size),
    };
  },

  setupShips: function(boardSize, count) {
    const {playerOne, playerTwo} = this.actions.setupBoard(boardSize);
    this.actions.expectedShipCount(count);
    return {
      playerOne: FieldActions.placeShipsFor(playerOne.player, playerOne.grid, count),
      playerTwo: FieldActions.placeShipsFor(playerTwo.player, playerTwo.grid, count),
    };
  },
});

module.exports = GameActions;
