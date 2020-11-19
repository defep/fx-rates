import React, { Component } from 'react';

import { Link } from "react-router-dom";

// Components
import RateForm from './RateForm';

class Rates extends Component {
  state = {
    rates: []
  }

  fetchData = () => {
    fetch('/api/rates')
      .then(res => res.json())
      .then((data) => {
        this.setState({ rates: data })
      })
      .catch(console.log)
  }

  componentDidMount() {
    document.title = 'FX Rates';
    this.fetchData();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mt-5">FX Rates</h1>

            <Link to="/">Go to main page</Link>

            <h3>Create a new FX pair</h3>

            <RateForm fetchData={this.fetchData} />

            <hr />

            <h3 className="mt-5">Rates list</h3>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">Pair</th>
                  <th className="text-right">Original rate</th>
                  <th className="text-right">Fee %</th>
                  <th className="text-right">Fee amount</th>
                  <th className="text-right">Rate with fee</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rates.map(e => (
                  <tr key={e._id}>
                    <td className="text-center">{e._id}</td>
                    <td className="text-right">{e.rate.toFixed(2)}</td>
                    <td className="text-right">{parseFloat(e.fee).toFixed(2)} %</td>
                    <td className="text-right">{((parseFloat(e.fee) / 100) * e.rate).toFixed(2)}</td>
                    <td className="text-right">{((parseFloat(e.fee) / 100 + 1) * e.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Rates;
