import React from 'react';

class UI extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        title: "",
        race: "",

        health: {
          maxHealth: 100,
          currentHealth: 100,
        },
        mana: {
          maxMana: 20,
          currentMana: 20,
        },

        stats: {
          AC: 0,
          EV: 0,
          Int: 0,
          Dex: 0,
        },

        gold: 0,
      }
    }


    
    render() {
      return (
        <div className="UI">
          Health : {this.state.health.currentHealth}/{this.state.health.maxHealth} <br/>
          Mana : {this.state.mana.currentMana}/{this.state.mana.maxMana}
        </div>
      );
    }
  }
  
  export default UI;