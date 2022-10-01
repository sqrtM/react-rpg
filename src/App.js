import React from 'react';
import './App.scss';
import Room from './Room'
import UI from './UI'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalColumns: 32,
      totalRows: 16,

      playerPosition: {
        x: 2,
        y: 6,
      },
    }

  }
  render() {
    return (
      <div id="container1">
        <UI />
        <Room columns={this.state.totalColumns} rows={this.state.totalRows} />
      </div>
    );
  }
}

export default App;