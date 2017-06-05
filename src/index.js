import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Slide from "./Slide/slide";

let canMove = true;
let unlockTimer = () => {
    setTimeout( () => {
        canMove = true;
    }, 200 );
};

class Slider extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { elem: [ "6", "1", "2", "3", "4", "5", "6" ] };
        this.prev = this.prev.bind( this );
    }
    prev() {
        console.log( "clicked prev!" );
        let track = document.getElementById( "track" );
        let style = window.getComputedStyle( track ).getPropertyValue( "left" );
        let numericValue = Number( style.slice( 0, -2 ) );
        if ( numericValue >= 0 && canMove ) {
            numericValue = 0 - ( this.state.elem.length * 200 );
            track.style.transition = "left 0s";
            setTimeout( () => {
                track.style.transition = "left 0.2s";
                track.style.left = `${ numericValue + 400 }px`;
            }, 0 );
        }
        if ( canMove ) {
            track.style.left = `${ numericValue + 200 }px`;
            canMove = false;
            unlockTimer();
        }
    }
    next() {
        console.log( "clicked next!" );
        console.log( this );
        let track = document.getElementById( "track" );
        let style = window.getComputedStyle( track ).getPropertyValue( "left" );
        let numericValue = Number( style.slice( 0, -2 ) );
        if ( numericValue <= 0 - ( ( this.state.elem.length - 1 ) * 200 ) && canMove ) {
            numericValue = 200;
            track.style.transition = "left 0s";
            setTimeout( () => {
                track.style.transition = "left 0.2s";
                track.style.left = `${ numericValue - 400 }px`;
            }, 0 );
        }
        if ( canMove ) {
            track.style.left = `${ numericValue - 200 }px`;
            canMove = false;
            unlockTimer();
        }
    }
    render() {
        console.log(this);
        return ( <div className="slider" id="slider" >
            <button className="btn btn-primary" id="prev" onClick={ this.prev } >Prev</button>
            <div className="viewport">
                <div className="track" id="track">
                    { this.state.elem.map( ( item ) => {
                        return ( <Slide data={ item } /> );
                    } )}
                </div>
            </div>
            <button className="btn btn-primary" id="next" onClick={ this.next.bind( this ) }>Next</button>
        </div> );
    }
}

ReactDOM.render(
    <Slider />,
    document.getElementById( "root" ),
);

console.log( Slide );
