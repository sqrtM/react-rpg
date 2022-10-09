import React from 'react';

class TextLog extends React.Component {

    messageLog = [];

    
    

    render() {
        return (
            <div>

            {Math.floor(this.props.status.time / 60) < 15 ? "the sun is rising" : Math.floor(this.props.status.time / 60) < 30 ? "it is midday" : Math.floor(this.props.status.time / 60) < 45 ? "the sun is setting" : "it is night time"}

            </div>
        )
    }
}

export default TextLog;