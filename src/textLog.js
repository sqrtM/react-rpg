import React from 'react';

class TextLog extends React.Component {

    messageLog = [];

    
    

    render() {
        return (
            <div>

            {Math.floor((this.props.time / 60) % 60) < 15 ? "the sun rises..." : 
            Math.floor((this.props.time / 60) % 60) < 30 ? "it is midday" : 
            Math.floor((this.props.time / 60) % 60) < 45 ? "the sun begins to set..." : 
            "it is nighttime"}

            </div>
        )
    }
}

export default TextLog;