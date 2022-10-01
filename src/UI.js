import React from 'react';

class UI extends React.Component {
    constructor(props) {
      super(props);
    }


    
    render() {
      return (
        <div className="UI">
          Health : {this.props.status.health.currentHealth}/{this.props.status.health.maxHealth} <br/>
          Mana : {this.props.status.mana.currentMana}/{this.props.status.mana.maxMana}
        </div>
      );
    }
  }
  
  export default UI;