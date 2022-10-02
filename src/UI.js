import React from 'react';


let healthArray;

class UI extends React.Component {  
  healthBar = (p) => {
    let percent = Math.round((this.props.status.health.currentHealth / this.props.status.health.maxHealth)*100);
    p = Array(20 - (20 - (percent / 5))).fill("=");
    if (p.length < 20) {
      for (let i = (20 - (20 - p.length)); i < 20; i++) {
        p.push(".")
      }
    }
    return p;
  }
  
    render() {
      
      return (
        <div className="UI">
          Health : {this.props.status.health.currentHealth}/{this.props.status.health.maxHealth} 
          {" "}{this.healthBar(healthArray)}
          <br/>
          Mana : {this.props.status.mana.currentMana}/{this.props.status.mana.maxMana} <br/>
          Time : {this.props.status.time} <br/>
          <button onClick={this.props.spawnMonster}>Spawn Monster</button>
        </div>
      );
    }
  }
  
  export default UI;