import React from 'react';


let healthArray;
let manaArray;
let hungerArray;
let sanityArray;
let rageArray;

class UI extends React.Component {
  percentHealth = Math.round((this.props.status.health.currentHealth / this.props.status.health.maxHealth) * 100);
  percentMana = Math.round((this.props.status.mana.currentMana / this.props.status.mana.maxMana) * 100);
  percentHunger = Math.round((this.props.status.hunger.currentHunger / this.props.status.hunger.maxHunger) * 100);
  percentSanity = Math.round((this.props.status.sanity.currentSanity / this.props.status.sanity.maxSanity) * 100);
  percentRage = Math.round((this.props.status.rage.currentRage / this.props.status.rage.maxRage) * 100);

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
        entityViewer.push((JSON.stringify(this.props.entityStatus[i], null, 4)).replace(/{|}|"/gi, ''))
      }
    }

    return (
      <div className="UI">
        <div className='playerInfo'>
          {this.props.status.health.currentHealth}/{this.props.status.health.maxHealth}...
          <br />
          {this.props.status.mana.currentMana}/{this.props.status.mana.maxMana}  ....
          <br />
          <div id="healthBar" style={this.percentHealth === 100 ? { color: 'green' } : this.percentHealth >= 75 ? { color: 'limeGreen' }
            : this.percentHealth >= 50 ? { color: 'yellow' } : this.percentHealth >= 25 ? { color: 'orange' }
              : this.percentHealth >= 0 ? { color: 'red' } : { color: 'white' }}>
            {" "}{this.renderBar(healthArray, this.percentHealth)}

            <div id="manaBar" style={this.percentMana === 100 ? { color: '#0000CC' } : this.percentMana >= 75 ? { color: '#0033CC' }
              : this.percentMana >= 50 ? { color: '#0066CC' } : this.percentMana >= 25 ? { color: '#0099CC' }
                : this.percentMana >= 0 ? { color: '#00CCCC' } : { color: '#00FFCC' }}>
              {" "}{this.renderBar(manaArray, this.percentMana)}

              {/*
              <div id="hungerBar" style={this.percenthunger === 100 ? { color: '#A66601' } : this.percenthunger >= 75 ? { color: '#704400' }
              : this.percenthunger >= 50 ? { color: '#4D340E' } : this.percenthunger >= 25 ? { color: '#2E1F06' }
                : this.percenthunger >= 0 ? { color: '#382200' } : { color: '#0D0800' }}>
              {" "}{this.renderBar(hungerArray, this.percenthunger)} </div>
              */}

            </div>
            <div style={{ color: "white" }}>
              Turn : {this.props.status.time}
              <br />
              {/* 00:00 is the crack of dawn.
                15:00 is the afternoon
                30:00 is high noon
                45:00 is evening */}
              Time : {Math.floor(this.props.status.time / 60) < 10 ? "0" : ""}{Math.floor(this.props.status.time / 60)}:{Math.floor(this.props.status.time) % 60 < 10 ? "0" : ""}{Math.floor(this.props.status.time) % 60}
            </div>
          </div>


          <button onClick={this.props.spawnMonster}>Spawn Monster</button>

        </div>

        <div className='playerInfo'>
          AC : {this.props.status.stats.AC} <br />
          EV : {this.props.status.stats.EV} <br />
          ATK : {this.props.status.stats.Atk} <br />
          INT : {this.props.status.stats.Int} <br />
          DEX : {this.props.status.stats.Dex} <br />
          SPD : {this.props.status.stats.Spd}

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