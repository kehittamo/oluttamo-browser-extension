import React from "react";
import DebounceInput from "react-debounce-input";
import { SEARCH_KEY_NAME, BEER_KEY_NAME, RATE_BEER_GET_BEER_PREFIX, RATE_BEER_URL } from "../constants";
import ajaxSearch from "../lib/ajaxSearch";
import setData from "../lib/setData";

const TextSearch = React.createClass({
    propTypes: {
        q: React.PropTypes.string,
    },
    getInitialState: function() {
        return {
            q: "",
        };
    },
    componentDidUpdate(previousProps, previousState){
        if(this.state.q !== previousProps.q){
            setData(SEARCH_KEY_NAME, this.state.q);
        }
    },
    render(){
        return(
            <div className="search">
                <strong>Search beers: </strong>
                <DebounceInput
                    minLength={1}
                    debounceTimeout={500}
                    onChange={event => this.setState({q: event.target.value})}
                    value={this.props.q} />
            </div>
        );
    },
});

export default TextSearch;
