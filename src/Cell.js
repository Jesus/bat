import React from 'react';
import { connect } from "react-redux";

class Cell extends React.Component {
  render() {
    return (
      <div className={`cell ${this.props.cellState}`}></div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let cellState = null;

  if (state.snake.head.x === props.x && state.snake.head.y === props.y) {
    cellState = 'head';
  } else if (state.food.x === props.x && state.food.y === props.y) {
    cellState = 'food';
  } else {
    for (let i = 0; i < state.snake.tail.length; i++) {
      if (state.snake.tail[i].x === props.x && state.snake.tail[i].y === props.y) {
        cellState = 'tail';
        break;
      }
    }
  }

  return { cellState };
};

export default connect(
  mapStateToProps,
  null,
)(Cell);
