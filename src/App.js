import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 23,
    }
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }

  render() {
    return (
      <div>
        Hello world!
        <p>
        count: {this.state.counter}
        </p>
        <button onClick={() => this.increment()}>+1</button>
        <button onClick={() => this.decrement()}>-1</button>
      </div>
    );
  }
}

export default App;
