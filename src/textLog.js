import React from 'react';

class TextLog extends React.Component {

    messageLog = [];  

    render() {
        return (
            <div>

            {Math.floor((this.props.time / 60) % 60) < 15 ? "the sun retreats from its apex" : 
            Math.floor((this.props.time / 60) % 60) < 30 ? "the night is upon us" : 
            Math.floor((this.props.time / 60) % 60) < 45 ? "the horizon warms its hue" : 
            "the daylight is returning"}

            </div>
        )
    }
}

export default TextLog;