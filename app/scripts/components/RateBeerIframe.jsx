import React from "react";
import { RATE_BEER_GET_BEER_PREFIX, RATE_BEER_URL } from "../constants";

const RateBeerIframe = React.createClass({
    getInitialState: function() {
        return {
            protocol: window.location.protocol,
            windowWidth: window.innerWidth,
        };
    },

    handleResize: function(e) {
        this.setState({ windowWidth: window.innerWidth });
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.handleResize);
    },
    render(){
        const {activeBeerId} = this.props;
        const rateBeerUrl = `${RATE_BEER_URL}${RATE_BEER_GET_BEER_PREFIX}/oluttamo/${activeBeerId}/`;
        // Set iframe width to 85% of window width
        const iframeWidth = parseInt(this.state.windowWidth * 0.85, 10);
        // Set iframe height to 10/21 of width
        const iframeHeight = parseInt(iframeWidth * (10/21), 10);
        return(
            <iframe width={iframeWidth} height={iframeHeight} src={rateBeerUrl} frameBorder="0"></iframe>
        );
    },
});

export default RateBeerIframe;
