import React, { Component } from "react";

import { Link } from "react-router-dom";

class MainPage extends Component {

    state = {
        amount: 1,
        conversion: 0,
        pair: '',
        from: '',
        to: '',
        rates: []
    }

    fetchData = () => {
        return fetch('/api/rates')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pair: data[0]._id,
                    from: data[0]._id.substr(0,3),
                    to: data[0]._id.substr(3),
                    rates: data
                })
            })
            .catch(console.log)
    }

    componentDidMount() {
        const fetch = this.fetchData();
        fetch.then(e => {
            this.updateConversion();
        })
    }

    updateConversion = () => {
        let obj = this.state.rates.find(obj => {
            return obj._id === this.state.pair;
        })

        if (obj) {
            this.setState({
                pair: obj._id,
                from: obj._id.substr(0,3),
                to: obj._id.substr(3),
                conversion: parseFloat(obj.rate * this.state.amount) * (obj.fee / 100 + 1)
            });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }, this.updateConversion);
    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-5">FX Rates</h1>

                    <form>
                        <input
                            name="amount"
                            type="number"
                            min="0"
                            value={this.state.amount}
                            onChange={this.handleChange} />
                        <select
                            name="pair"
                            value={this.state.pair}
                            onChange={this.handleChange}>
                            {this.state.rates.map(e => (
                                <option key={e._id} value={e._id}>{e._id}</option>
                            ))}
                        </select>
                    </form>

                    <h5>{this.state.amount} {this.state.from} equals</h5>
                    <h4>{this.state.conversion.toFixed(2)} {this.state.to}</h4>

                    <Link to="/admin">Click here to create a new rate.</Link>
                </div>
            </div>
        </div>);
    }
}

export default MainPage;