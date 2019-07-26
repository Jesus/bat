import React from 'react';
import { connect } from "react-redux";

import Board from './Board';

class App extends React.Component {
  constructor(props) {
    super(props);
    setInterval(() => { this.props.tick(); }, 100);
    this.props.harvest();
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.props.turn('up');
          break;
        case 'ArrowRight':
          this.props.turn('right');
          break;
        case 'ArrowDown':
          this.props.turn('down');
          break;
        case 'ArrowLeft':
          this.props.turn('left');
          break;
      }
    });
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}


const mapDispatchToProps = {
  tick: () => ({ type: 'TICK' }),
  harvest: () => ({ type: 'HARVEST' }),
  turn: (direction) => ({ type: 'TURN', payload: direction}),
};

export default connect(
  null,
  mapDispatchToProps
)(App);
