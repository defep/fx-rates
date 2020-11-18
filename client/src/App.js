import React, { Component } from 'react';

import RateForm from './components/RateForm';

class App extends Component {
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
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="mt-5">FX Rates</h1>
            <h3>Create a new FX pair</h3>


          <RateForm fetchData={this.fetchData} />

          <hr/>

          <h3 class="mt-5">Rates</h3>

          <table class="table table-striped">
            <thead>
              <tr>
                <th class="text-center">Pair</th>
                <th class="text-right">Original rate</th>
                <th class="text-right">Fee %</th>
                <th class="text-right">Fee amount</th>
                <th class="text-right">Rate with fee</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rates.map(e => (
                <tr key={e._id}>
                  <td class="text-center">{e._id}</td>
                  <td class="text-right">{e.rate.toFixed(2)}</td>
                  <td class="text-right">{parseFloat(e.fee).toFixed(2)} %</td>
                  <td class="text-right">{((parseFloat(e.fee) / 100) * e.rate).toFixed(2)}</td>
                  <td class="text-right">{((parseFloat(e.fee) / 100 + 1) * e.rate).toFixed(2)}</td>
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

export default App;
