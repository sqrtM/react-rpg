import React from 'react';


let healthArray;
let manaArray;

class UI extends React.Component {
  percentHealth = Math.round((this.props.status.health.currentHealth / this.props.status.health.maxHealth) * 100);
  percentMana = Math.round((this.props.status.mana.currentMana / this.props.status.mana.maxMana) * 100);
  renderBar = (p, percentType) => {
    p = Array(20 - (20 - Math.round(percentType / 5))).fill("=");
    if (p.length < 20) {
      if (percentType % 5 !== 0) { p.push('-') }
      for (let i = (20 - (20 - p.length)); i < 20; i++) {
        p.push(".");
      }
    }
    return p;
  }



  render() {
    let entityViewer = [];
    if (Object.keys(this.props.entityStatus).length) {
      for (let i in this.props.entityStatus) {
        entityViewer.push((JSON.stringify(this.props.entityStatus[i], null, 4)).replace(/{|}|"/gi,''))
      }
    }

    return (
      <div className="UI">
        <div className='playerInfo'>
          Health : {this.props.status.health.currentHealth}/{this.props.status.health.maxHealth}
          <span style={this.percentHealth === 100 ? { color: 'green' } : this.percentHealth >= 75 ? { color: 'limeGreen' }
            : this.percentHealth >= 50 ? { color: 'yellow' } : this.percentHealth >= 25 ? { color: 'orange' }
            : this.percentHealth >= 0 ? { color: 'red' } : { color: 'white' }}>
            {" "}{this.renderBar(healthArray, this.percentHealth)}
          </span>
          <br />

          Mana : {this.props.status.mana.currentMana}/{this.props.status.mana.maxMana}
          <span style={this.percentMana === 100 ? { color: '#0000CC' } : this.percentMana >= 75 ? { color: '#0033CC' }
            : this.percentMana >= 50 ? { color: '#0066CC' } : this.percentMana >= 25 ? { color: '#0099CC' }
            : this.percentMana >= 0 ? { color: '#00CCCC' } : { color: '#00FFCC' }}>
            {" "}{this.renderBar(manaArray, this.percentMana)}
          </span>

          <br />

          Time : {this.props.status.time} <br />

          <button onClick={this.props.spawnMonster}>Spawn Monster</button>
        </div>

        <div className='entityInfo'>
          {entityViewer.map((i, index) => 
          <div key={`key-${index}`}>{i}</div>)}
        </div>
      </div>
    );
  }
}

export default UI;