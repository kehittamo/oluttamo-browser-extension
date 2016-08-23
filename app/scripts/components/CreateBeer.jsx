import React from "react";
import {SEARCH_KEY_NAME} from "../constants";
import getData from "../lib/getData";
import setData from "../lib/setData";
import removeData from "../lib/removeData";
import {ajaxCreateBeer} from "../lib/ajax";
import RateBeerIframe from "./RateBeerIframe";

const CreateBeer = React.createClass({
    getInitialState: function(){
        return{
            beerName: "",
            beerFullName: "",
            breweryName: "",
            ratebeerId: "",
            show: "hide",
            error: false,
            success: false,
            showIframe: false,
        };
    },
    handleSubmit(e){
        e.preventDefault();
        const {beerName, breweryName, ratebeerId, showIframe} = this.state;
        const beerFullName = `${this.state.breweryName} ${this.state.beerName}`;
        if(!showIframe && parseInt(ratebeerId) > 0){
            this.setState({
                showIframe: true,
                error: false,
            });
        } else if(beerName !== "" && beerFullName !== "" && breweryName !== "" && parseInt(ratebeerId) > 0){
            const data = `beerName=${beerName}&beerFullName=${beerFullName}&breweryName=${breweryName}&ratebeerId=${ratebeerId}`;
            ajaxCreateBeer(data)
            .then((result) => {
                if(result.error){
                    throw result.error;
                } else {
                    this.setState({
                        error: false,
                        success: true,
                        beerName: "",
                        breweryName: "",
                        ratebeerId: "",
                        showIframe: false,
                        beerFullName,
                    });
                    // Get latest search query
                    return getData(SEARCH_KEY_NAME);
                }
            })
            .then((searchQuery) =>{
                // Try to remove beer data from storage
                return removeData(searchQuery);
            })
            .then(() => {
                // Remove search query from storage so we can search new results
                return removeData(SEARCH_KEY_NAME);
            })
            .then(() => {
                // Search again with new data
                setData(SEARCH_KEY_NAME, beerFullName);
            })
            .catch((err) => {
                console.error("Oh noes, something went wrong while creating new beer :(", err);
                this.setState({
                    error: err,
                    success: false,
                    showIframe: false,
                });
            });
        } else {
            this.setState({
                error: "You need to fill Beer name, Brewery name and Ratebeer ID!",
                success: false,
                showIframe: false,
            });
        }
    },
    handleBeerNameChange(e){
        this.setState({
            beerName: e.target.value,
            showIframe: false,
        });
    },
    handleBreweryNameChange(e){
        this.setState({
            breweryName: e.target.value,
            showIframe: false,
        });
    },
    handleRatebeerIdChange(e){
        this.setState({
            ratebeerId: e.target.value,
            showIframe: false,
        });
    },
    showForm(e){
        e.preventDefault();
        this.setState({
            show: "show",
        });
    },
    hideForm(e){
        e.preventDefault();
        this.setState({
            show: "hide",
        });
    },
    render(){
        const {show, error, success, beerName, breweryName, ratebeerId, showIframe} = this.state;
        const errorMessage = error ? <h1 className="error">Error: {error}</h1> : null;
        const successMessage = success ? <h1 className="success">Cheers! {this.state.beerFullName} added successfully :)</h1> : null;
        const submitTitle = `Beer name: ${beerName}, Brewery name: ${breweryName}, Ratebeer ID: ${ratebeerId}`;
        const iframe = showIframe ? (<div><h4>Looking okay?</h4><RateBeerIframe activeBeerId={ratebeerId} /></div>): null;
        const submitValue = showIframe ? `Create ${breweryName} ${beerName}` : "Review Ratebeer-page";
        return(
            <div className="search-results__add-beer-form">
                <button className="tintbiwlf" onClick={this.showForm}>This is not the beer I was looking for!</button>
                <form onSubmit={this.handleSubmit} className={show}>
                    <h4>Create new beer</h4>
                    <label>Beer name:</label>
                    <input type="text" required value={beerName} onChange={this.handleBeerNameChange} />
                    <label>Brewery name:</label>
                    <input type="text" required value={breweryName} onChange={this.handleBreweryNameChange} />
                    <label>Beer full name:</label>
                    <input type="text" required disabled value={`${breweryName} ${beerName}`} />
                    <label>Ratebeer ID:</label>
                    <input type="number" required value={ratebeerId} onChange={this.handleRatebeerIdChange} />
                    <div className="info">
                        <strong>Please send only correct beer data!</strong>
                        <p>Easiest way to find Ratebeer ID is get it from the url.</p>
                        <p>For example <a href="http://www.ratebeer.com/beer/sori-investor-ipa/335021/" target="_blank">http://www.ratebeer.com/beer/sori-investor-ipa/335021/</a> -> 335021 is Ratebeer ID.</p>
                    </div>
                    <button onClick={this.hideForm}>Cancel</button>
                    <input type="submit" value={submitValue} title={submitTitle}/>
                    {errorMessage}
                    {successMessage}
                    {iframe}
                </form>
            </div>
        );
    },
});

export default CreateBeer;
