import React, { Component } from 'react';

const currencies = [
    { key: 'EURUSD', value: 'EURUSD' },
    { key: 'EURARS', value: 'EURARS' },
    { key: 'EURBRL', value: 'EURBRL' },
    { key: 'USDEUR', value: 'USDEUR' },
    { key: 'USDARS', value: 'USDARS' },
    { key: 'USDBRL', value: 'USDBRL' },
    { key: 'BRLEUR', value: 'BRLEUR' },
    { key: 'BRLARS', value: 'BRLARS' },
    { key: 'BRLUSD', value: 'BRLUSD' },
];

class RateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fee: 0,
            rate: 0,
            pair: currencies[0].key
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        let res = fetch('/api/rates', {
            method: 'post',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        });

        res.then(e => {
            this.props.fetchData();
        });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label>Fee %</label>
                        <input class="form-control" name="fee" type="number" onChange={this.handleInputChange}></input>

                    </div>
                    <div class="form-group col-md-4">
                        <label>Pair</label>
                        <select class="form-control" name="pair" onChange={this.handleInputChange}>
                            { currencies.map(e =>
                                <option value={ e.key }>{ e.value }</option>
                            )}
                        </select>

                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <input type="submit" value="Submit" class="btn btn-primary" onClick={this.props.handler} />
                    </div>
                </div>
            </form>
        );
    }
}

export default RateForm;