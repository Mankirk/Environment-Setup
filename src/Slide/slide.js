import React from "react";
import "./slide.css";

export default class Slide extends React.Component {
    render () {
        return (
            <div className="slide">{ this.props.data }</div>
        );
    }
}
