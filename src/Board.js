import React from 'react';
import { connect } from "react-redux";

import Cell from './Cell';

class Board extends React.Component {
  render() {
    return (
      <div className="board">
        {Array.from({length: this.props.size.x}, (v, x) => {
          return (
            <div className="board-row" key={`row_${x}`}>
              {Array.from({length: this.props.size.y}, (v, y) => {
                return <Cell key={`cell_${x}_${y}`} x={x} y={y} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.board.size,
  }
};

export default connect(
  mapStateToProps,
)(Board);
