import React, { Component } from 'react';
import jsonData from './data.json';

class App extends Component {
  state = {
    dataKeys: [],
    data: []
  };

  componentDidMount() {
    this.setState({
      dataKeys: [{ id: 'date', name: 'Date' }, { id: 'value', name: 'Value' }],
      data: jsonData
    });
  }

  render() {
    const dataKeyIds = this.state.dataKeys.map(dataKey => dataKey.id);
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>#</th>
              {this.state.dataKeys.map(dataKey => (
                <th key={dataKey.id}>{dataKey.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {dataKeyIds.map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
