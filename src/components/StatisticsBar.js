import React from "react";

export default class StatisticsBar extends React.Component {
    constructor(props) {
        super(props);
        this.ms =0;
        this.second =0;
        this.minute=0;

        this.state = {
            timer: "00:00",
            avgMoveTime: "00:00",
            lastCard:"0",
            moves:"0"

        };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    
    tick() {
        let newTimer = this.minute + "mins " + this.second + "secs";
        if (this.ms == 100) {
            this.ms = 0;
            if (this.second == 60) {
                this.minute++;
                this.second = 0;
            } else {
                this.second++;
            }
            if (this.minute == 60) {
                this.hour++;
                this.minute = 0;
            }
        } else {
            this.ms++;
        }
        this.setState({
            timer: newTimer
        });
    }

    render() {
        return (
            <div id="topBar">
                <div id="topBarFirstRow">
                    <div className="statItem">
                        {"Timer"}
                    <div className="statItem">
                            <span id="timer" className="topBarItem">
                                {this.state.timer} 
                        </span>
                        </div>
                    </div>
                    <div className="statItem">
                        {"Avg move time"} 
                  <div className="statItemData" id="avgMoveTime">
                            {this.state.avgMoveTime} 
                  </div>
                    </div>
                    <div className="statItem">
                        {"Reached last card"}
                    <div className="statItemData" id="reachedLastCard">
                            {this.state.lastCard} 
                    </div>
                    </div>
                    <div className="statItem">
                        {"Moves"}
                    <div className="statItemData" id="Moves">
                            {this.state.moves} 
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
