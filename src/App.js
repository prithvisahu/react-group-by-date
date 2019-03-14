import React, { Component } from 'react';
import moment from 'moment';
import jsonData from './data.json';

class App extends Component {
  state = {
    data: [],
    groupBy: ''
  };

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
    switch (this.state.groupBy) {
      case 'day':
        return this.groupDataByMonth();
      case 'week':
        return this.groupDataByMonth();
      case 'month':
        return this.groupDataByMonth();
      case 'quarter':
        return this.groupDataByMonth();
      case 'year':
        return this.groupDataByMonth();
      case '':
      default:
        return this.state.data;
    }
  };

  groupDataByMonth = () => {
    const dataWithMonthAsDate = this.state.data.map(item => {
      const monthOfYear = moment(item.date).format('YYYY-MM');
      return { ...item, date: monthOfYear };
    });

    const months = [...new Set(dataWithMonthAsDate.map(item => item.date))];

    const dataGroupedByMonth = months.map(month => {
      const filteredData = dataWithMonthAsDate.filter(
        item => item.date == month
      );
      return {
        date: month,
        value: filteredData.reduce((sum, item) => sum + item.value, 0)
      };
    });

    return dataGroupedByMonth;
  };

  render() {
    const groupedData = this.groupData();

    return (
      <div className="App">
        <div>
          <label>Group By: </label>
          <select
            defaultValue={this.state.groupBy}
            onChange={this.handleGroupByChange}
          >
            <option value="">None</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
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
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
