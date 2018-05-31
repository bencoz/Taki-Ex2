

import React from "react";

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }

    render() {
        return (
            <div className="container">
                <header>
                    <img id="quit-button" src=".\images\quit.svg" alt=""></img>
                    <img src=".\images\logo.png" alt=""></img>
                    <img id="start-button" src=".\images\start.svg" alt="" onClick={this.props.startButtonClickHandle}></img>
               </header>
             </div>
        );
    }
}