const React = require('react');

const alt = require('../altInstance');
const Cell = require('../components/grid/Cell');
const Empty = require('../components/Empty');
const Ship = require('../components/Ship');
const {isValidSquare, randomNumber, updateGridWithShip} = require('../util/grid');

const FieldActions = alt.createActions({displayName: 'FieldActions',
  createFieldFor: function(player, size) {
    return {player, grid: FieldActions.createField(size)};
  },

  createField: function(size) {
    for (var grid = []; grid.length < size;) {
      for (var subgrid = []; subgrid.push(<Cell><Empty /></Cell>) < size;);
      grid.push(subgrid);
    }
    return grid;
  },

  placeShipsFor: function(player, grid, count) {
    const size = grid.length;
    var updatedGrid = grid;
    var ships = [];
    for (var i = 0; i < count; i++) {
      var tries = 0;
      while (tries < 20) {
        const row = randomNumber(size - 1);
        const col = randomNumber(size - 1);
        var validShip = isValidSquare(grid, row, col);
        for (var len = 1; len < Ship.LENGTH && validShip; len++) {
          validShip = isValidSquare(updatedGrid, row, col + len);
        }

        if (validShip) {
          const ship = <Ship id={ships.length} coords={{start: {row, col}, orientation: Ship.HORIZONTAL}} />;
          ships.push(ship);
          updatedGrid = updateGridWithShip(updatedGrid, ship);
          break;
        }
        tries++;
      }
    }
    return {player, grid: updatedGrid, ships};
  },

  updateCell: function(cell, row, col, shipHit) {
    return {
      cell: React.cloneElement(cell, {cellClicked: true}),
      row, col,
      shipHit: !cell.props.cellClicked && shipHit,
    };
  },
});

module.exports = FieldActions;
