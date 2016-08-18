import React from "react";
import DebounceInput from "react-debounce-input";
import { BEER_KEY_NAME, RATE_BEER_GET_BEER_PREFIX, RATE_BEER_URL } from "../constants";
import ajaxSearch from "../lib/ajaxSearch";
import setData from "../lib/setData";

const TextSearch = React.createClass({
    propTypes: {
        beerResults: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {
            q: "",
        };
    },
    componentDidUpdate(previousProps, previousState){
        if(this.state.q !== previousState.q){
            const self = this;
            ajaxSearch(this.state.q)
            .then((result) => {
                if(result.length === 0){
                    self.props.beerResults(self.state.q, [], "404");
                } else {
                    setData(BEER_KEY_NAME, {query: self.state.q, data: result, url: window.location.href});
                    self.props.beerResults(self.state.q, result);
                }
            })
            .catch((err) => {
                // TODO: better error message
                console.error("Oh noes, something went wrong while fetching beers :(", err);
            });
        }
    },
    render(){
        return(
            <div className="search">
                <strong>Search beers: </strong>
                <DebounceInput
                    minLength={1}
                    debounceTimeout={500}
                    onChange={event => this.setState({q: event.target.value})} />
            </div>
        );
    },
});

export default TextSearch;
