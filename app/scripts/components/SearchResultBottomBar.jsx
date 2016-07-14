import React from "react";

const SearchResultBottomBar = React.createClass({
    propTypes: {
        showResults: React.PropTypes.func.isRequired,
    },
    handleClick(e){
        e.preventDefault();
        this.props.showResults();
    },
    render(){
        const {beerData, show, q} = this.props;
        const beerCount = beerData.length;
        const classNames = (show && beerCount > 0) ? "show search-results__bottom-bar" : "hidden search-results__bottom-bar";
        return(
            <div className={classNames}>
                <a href="#" onClick={this.handleClick}>Show beers of "{q}" (Beer count: {beerCount})</a>
            </div>
        );
    },
});

export default SearchResultBottomBar;
