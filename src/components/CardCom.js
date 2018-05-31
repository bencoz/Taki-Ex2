import React from "react";

export default class CardCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var url = "url(./images/cards/" + this.props.name + "_" + this.props.color + ".png)";
        let newStyle = {
            backgroundImage: url
        }
        return (
            <div className="card"
                style={newStyle}
                name={this.props.name}
                color={this.props.color}
                isspecial={this.props.isSpecial}
                ownerid={this.props.ownerID}
                onClick={this.props.handleClickCard} >
            
            </div>
        );
    }
}