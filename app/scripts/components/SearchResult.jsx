import React from "react";
import { RATE_BEER_GET_BEER_PREFIX, RATE_BEER_URL } from "../constants";

const SearchResult = React.createClass({
    propTypes: {
        changeBeer: React.PropTypes.func.isRequired,
    },
    handleClick(e){
        e.preventDefault();
        this.props.changeBeer(this.props.beerData.ratebeerId);
    },
    render(){
        const {beerData, activeBeerId} = this.props;
        const rateBeerUrl = `${RATE_BEER_URL}${RATE_BEER_GET_BEER_PREFIX}${beerData.ratebeerId}/`;
        return(
          <li className={activeBeerId === beerData.ratebeerId ? "active" : ""}>
              <span title="Show beer ratebeer info" data-ratebeerId={beerData.ratebeerId} onClick={this.handleClick}>{beerData.beerFullName}</span>
              <i> – </i>
              <a className="inline" target="_blank" title={"Open: " + rateBeerUrl} href={rateBeerUrl}>@</a>
          </li>
        );
    },
});

export default SearchResult;
