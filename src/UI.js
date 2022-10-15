import React from 'react';


let healthArray;
let manaArray;
let hungerArray;
let sanityArray;
let rageArray;

class UI extends React.Component {

  percentHealth = Math.round((this.props.status.bars.health.currentHealth / this.props.status.bars.health.maxHealth) * 100);
  percentMana = Math.round((this.props.status.bars.mana.currentMana / this.props.status.bars.mana.maxMana) * 100);
  percentHunger = Math.round((this.props.status.bars.hunger.currentHunger / this.props.status.bars.hunger.maxHunger) * 100);
  percentSanity = Math.round((this.props.status.bars.sanity.currentSanity / this.props.status.bars.sanity.maxSanity) * 100);
  percentRage = Math.round((this.props.status.bars.rage.currentRage / this.props.status.bars.rage.maxRage) * 100);

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
          {/*}
          {this.props.status.bars.health.currentHealth}/{this.props.status.bars.health.maxHealth}...
          <br />
          {this.props.status.bars.mana.currentMana}/{this.props.status.bars.mana.maxMana}  ....
          <br /> */}
          <div className='bars'>
            <div id="healthBar" style={this.percentHealth === 100 ? { color: 'green' } : this.percentHealth >= 75 ? { color: 'limeGreen' }
              : this.percentHealth >= 50 ? { color: 'yellow' } : this.percentHealth >= 25 ? { color: 'orange' }
                : this.percentHealth >= 0 ? { color: 'red' } : { color: 'white' }}>
              {" "}{this.renderBar(healthArray, this.percentHealth)}
            </div>
            <div id="manaBar" style={this.percentMana === 100 ? { color: '#0000CC' } : this.percentMana >= 75 ? { color: '#0033CC' }
              : this.percentMana >= 50 ? { color: '#0066CC' } : this.percentMana >= 25 ? { color: '#0099CC' }
                : this.percentMana >= 0 ? { color: '#00CCCC' } : { color: '#00FFCC' }}>
              {" "}{this.renderBar(manaArray, this.percentMana)}
            </div>
            <div id="rageBar" style={this.percentRage === 100 ? { color: '#8B0000' } : this.percentRage >= 75 ? { color: '#FF0000' }
              : this.percentRage >= 50 ? { color: '#DC143C' } : this.percentRage >= 25 ? { color: '#F08080' }
                : this.percentRage >= 0 ? { color: '#E9967A' } : { color: '#FFA07A' }}>
              {" "}{this.renderBar(rageArray, this.percentRage)}
            </div>
            <div id="sanityBar" style={this.percentSanity === 100 ? { color: '#fefe22' } : this.percentSanity >= 75 ? { color: '#ffe135' }
              : this.percentSanity >= 50 ? { color: '#ffff66' } : this.percentSanity >= 25 ? { color: '#fdfd96' }
                : this.percentSanity >= 0 ? { color: '#fffacd' } : { color: '#f0e68c' }}>
              {" "}{this.renderBar(sanityArray, this.percentSanity)}
            </div>
            <div id="hungerBar" style={this.percenthunger === 100 ? { color: '#cc00cc' } : this.percenthunger >= 75 ? { color: '#bd33a4' }
            : this.percenthunger >= 50 ? { color: '#cf71af' } : this.percenthunger >= 25 ? { color: '#f1a7fe' }
              : this.percenthunger >= 0 ? { color: '#f4bbff' } : { color: '#f4f0ec' }}>
              {" "}{this.renderBar(hungerArray, this.percentHunger)}
            </div>

            {/* style={this.percenthunger === 100 ? { color: '#A66601' } : this.percenthunger >= 75 ? { color: '#704400' }
            : this.percenthunger >= 50 ? { color: '#4D340E' } : this.percenthunger >= 25 ? { color: '#2E1F06' }
              : this.percenthunger >= 0 ? { color: '#382200' } : { color: '#0D0800' }} */}
          </div>

          <div style={{ color: "white" }}>
            Turn : {this.props.time}
            <br />
            {/* 00:00 is the crack of dawn.
                15:00 is the afternoon
                30:00 is high noon
                45:00 is evening        */}
            Time : {Math.floor(this.props.time / 60) < 10 ? "0" : ""}{Math.floor((this.props.time / 60) % 60)}:{Math.floor(this.props.time) % 60 < 10 ? "0" : ""}{Math.floor(this.props.time) % 60}
          </div>

          <button onClick={this.props.spawnMonster}>Spawn Monster</button>

        </div>

        <div className='playerInfo'>
        
        {this.props.stats}
        
        {/* 
          AC : {this.props.status.stats.AC} <br />
          EV : {this.props.status.stats.EV} <br />
          ATK : {this.props.status.stats.Atk} <br />
          INT : {this.props.status.stats.Int} <br />
          DEX : {this.props.status.stats.Dex} <br />
          SPD : {this.props.status.stats.Spd}
        */}
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