import React from "react";
// import SearchResult from "./SearchResult";


const SearchResults = React.createClass({
    render(){
        const {data} = this.props;
        return(
            <div className="search-results">
              <h1>Cheers!</h1>
              <iframe width="560" height="315" src="http://www.ratebeer.com/beer/101389/" frameBorder="0"></iframe>
              {data.map((beerData, i) => <p key={i}>{beerData.beerFullName}, {beerData.ratebeerId}</p>)}
            </div>
        );
    },
});

export default SearchResults;
