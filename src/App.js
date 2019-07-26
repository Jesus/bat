import React from 'react';
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div>
        <p>
        count: { this.props.counter }
        </p>
        <button onClick={() => this.props.increment()}>+1</button>
        <button onClick={() => this.props.decrement()}>-1</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    counter: state.counter,
  }
};

const mapDispatchToProps = {
  increment: () => ({ type: 'INCR' }),
  decrement: () => ({ type: 'DECR' }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
