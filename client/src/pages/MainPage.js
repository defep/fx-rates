import React, { Component } from "react";

import { Link } from "react-router-dom";

class MainPage extends Component {

    state = {
        visible: false,
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
                if (data.length > 0) {
                    this.setState({
                        visible: true,
                        pair: data[0]._id,
                        from: data[0]._id.substr(0, 3),
                        to: data[0]._id.substr(3),
                        rates: data
                    })
                }
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
                from: obj._id.substr(0, 3),
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
        const { visible } = this.state;
        return (<div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="mt-5">FX Rates</h1>
                </div>
            </div>

            <form style={{ display: (visible ? 'block' : 'none') }}>
                <div className="d-flex justify-content-center">
                    <div className="p-2">
                        <label>Amount</label>
                        <input
                            className="form-control"
                            name="amount"
                            type="number"
                            min="0"
                            value={this.state.amount}
                            onChange={this.handleChange} />
                    </div>
                    <div className="p-2">
                        <label>Conversion</label>
                        <select
                            className="form-control"
                            name="pair"
                            value={this.state.pair}
                            onChange={this.handleChange}>
                            {this.state.rates.map(e => (
                                <option key={e._id} value={e._id}>{e._id}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className="row" style={{ display: (visible ? 'block' : 'none') }}>
                <div className="col-md-12 text-center">
                    <h5 className="mt-4">{this.state.amount} {this.state.from} equals to</h5>
                    <h1 className="mt-0 mb-5">{this.state.conversion.toFixed(2)} {this.state.to}</h1>
                </div>
            </div>
            <div className="row text-center">
                <div className="col">
                    <Link to="/admin">Click here to create a new rate</Link>
                </div>
            </div>
        </div>);
    }
}

export default MainPage;