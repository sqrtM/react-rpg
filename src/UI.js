import React from 'react';

class UI extends React.Component {  
    render() {
      return (
        <div className="UI">
          Health : {this.props.status.health.currentHealth}/{this.props.status.health.maxHealth} <br/>
          Mana : {this.props.status.mana.currentMana}/{this.props.status.mana.maxMana} <br/>
          Time : {this.props.status.time} <br/>
          <button onClick={this.props.spawnMonster}>Spawn Monster</button>
        </div>
      );
    }
  }
  
  export default UI;