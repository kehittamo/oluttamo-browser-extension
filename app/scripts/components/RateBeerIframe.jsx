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
        const rateBeerUrl = `${RATE_BEER_URL}${RATE_BEER_GET_BEER_PREFIX}${activeBeerId}/`;
        // Set iframe width to 75% of window width
        const iframeWidth = parseInt(this.state.windowWidth * 0.75, 10);
        // Set iframe height to 9/16 of width
        const iframeHeight = parseInt(iframeWidth * (9/16), 10);
        const iframeElement = this.state.protocol === "https:" ? (
          <div className="search-results__no-results">
            <strong>Oh noes, we can't load iframe from <a href={rateBeerUrl} target="_blank">{rateBeerUrl}</a> because your current site is using "https"-protocol! But you can open the link :)</strong>
            <img src="https://cdn.meme.am/instances/500x/67076403.jpg" alt="Oh noes!" />
          </div>
          ) : <iframe width={iframeWidth} height={iframeHeight} src={rateBeerUrl} frameBorder="0"></iframe>;
        return(
            <div>
              {iframeElement}
            </div>
        );
    },
});

export default RateBeerIframe;
