import React, { Component } from 'react';
import moment from 'moment';
import jsonData from './data.json';

class App extends Component {
  state = {
    data: [],
    groupBy: ''
  };

  intervalFormats = new Map([
    ['week', 'YYYY-ww'],
    ['month', 'YYYY-MM'],
    ['quarter', 'YYYY-Q'],
    ['year', 'YYYY']
  ]);

  componentDidMount() {
    this.setState({
      data: jsonData
    });
  }

  handleGroupByChange = event => {
    const groupBy = event.target.value;
    this.setState({ groupBy: groupBy });
  };

  groupData = () => {
    if (this.state.groupBy === '') {
      return this.state.data;
    }

    return this.groupDataByInterval();
  };

  groupDataByInterval = () => {
    const dataWithIntervalAsDate = this.intervalFormats.has(this.state.groupBy)
      ? this.getDataWithIntervalAsDate()
      : this.state.data;

    const intervals = [
      ...new Set(dataWithIntervalAsDate.map(item => item.date))
    ];

    return intervals.map(interval => {
      const filteredData = dataWithIntervalAsDate.filter(
        item => item.date === interval
      );

      return {
        date: interval,
        value: filteredData.reduce((sum, item) => sum + item.value, 0)
      };
    });
  };

  getDataWithIntervalAsDate = () => {
    return this.state.data.map(item => ({
      ...item,
      date: moment(item.date).format(
        this.intervalFormats.get(this.state.groupBy)
      )
    }));
  };

  render() {
    const groupedData = this.groupData();

    return (
      <div className="App" style={{ padding: '20px' }}>
        <div className="GroupBySelect">
          <label>Group By: </label>
          <select
            defaultValue={this.state.groupBy}
            onChange={this.handleGroupByChange}
            style={{ padding: '5px', marginLeft: '5px' }}
          >
            <option value="">None</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="Output" style={{ marginTop: '20px' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td style={{ textAlign: 'right' }}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
