import React, { Component } from 'react';
import debounce from 'lodash/debounce';
const controller = new AbortController();
const { signal } = controller;

export class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            results: []
        }
    }

    onInput = debounce((e) => {
        if (e.target.value.length > 1) {
            fetch("/api/home/search?s=" + e.target.value, { signal: signal, headers: { "content-type": "application/json" } }).then(res => {
                return res.json();
            }).then((result) => {
                this.setState({ results: result });
            });
        } else this.setState({ results: [] });

    }, 500);

    onChange = (e) => {
        this.setState({
            searchInput: e.target.value
        });

        this.onInput(e);
    }

    render() {
        const { results } = this.state;
        return (
            <form>
                <input className="input"
                    onChange={this.onChange}
                    value={this.state.searchInput}
                    placeholder="Search here" />
                <button className="search-btn">Search</button>
                {
                    results && results.length > 0 &&
                    <ul className="list-group list-group-flush">
                        {
                            results.map((res) => <li className="list-group-item" key={res.id}>{res.brandName}</li>)
                        }
                    </ul>
                }
            </form>
        );
    }
}
export default Autocomplete;