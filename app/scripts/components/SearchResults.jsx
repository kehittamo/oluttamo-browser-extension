import React from "react";
import SearchResult from "./SearchResult";
import RateBeerIframe from "./RateBeerIframe";
import SearchResultBottomBar from "./SearchResultBottomBar";

const SearchResults = React.createClass({
    getInitialState: function() {
        return {
            activeBeerId: null,
            showResults: true,
        };
    },
    componentWillMount: function(){
        document.addEventListener("keydown", this.handleKeyDown, false);
    },
    componentDidMount: function() {
        const {data} = this.props;
        if(data.length > 0){
            this.setState({
                activeBeerId: data[0].ratebeerId,
            });
        }
    },
    componentWillUnmount: function(){
        document.removeEventListener("keydown", this.handleKeyDown, false);
    },
    changeBeerUrl(activeBeerId){
        this.setState({
            activeBeerId,
        });
    },
    toggleResults(){
        this.setState({
            showResults: !this.state.showResults,
        });
    },
    handleKeyDown(e){
        // Hide/show results on esc keydown
        if(e.keyCode === 27){
            this.toggleResults();
        }
    },
    render(){
        const {data, q} = this.props;
        const iframe = this.state.activeBeerId ? <RateBeerIframe activeBeerId={this.state.activeBeerId} /> : null;
        const noResults = (data.length === 0) ? <div className="search-results__no-results">Nothing found! :(</div> : null;
        return(
            <div className="search-results" >
                <section className={this.state.showResults ? "search-results__wrapper show" : "search-results__wrapper hidden"}>
                    <span className="close-btn" onClick={this.toggleResults}>Close</span>
                    {iframe}
                    <h1>Search results for: "{q}"</h1>
                    {noResults}
                    <ul>
                        {data.map((beerData, i) => <SearchResult activeBeerId={this.state.activeBeerId} changeBeer={this.changeBeerUrl} key={i} beerData={beerData} />)}
                    </ul>
                </section>
                <SearchResultBottomBar show={!this.state.showResults} q={q} beerData={data} showResults={this.toggleResults} />
            </div>
        );
    },
});

export default SearchResults;
