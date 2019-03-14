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
    switch (this.state.groupBy) {
      case 'day':
        return this.groupDataByDay();
      case 'week':
        return this.groupDataByWeek();
      case 'month':
        return this.groupDataByMonth();
      case 'quarter':
        return this.groupDataByQuarter();
      case 'year':
        return this.groupDataByYear();
      case '':
      default:
        return this.state.data;
    }
  };

  getDataGroupedByInterval = (intervals, dataWithIntervalAsDate) => {
    const dataGroupedByInterval = intervals.map(interval => {
      const filteredData = dataWithIntervalAsDate.filter(
        item => item.date === interval
      );
      return {
        date: interval,
        value: filteredData.reduce((sum, item) => sum + item.value, 0)
      };
    });

    return dataGroupedByInterval;
  };

  groupDataByDay = () => {
    const days = [...new Set(this.state.data.map(item => item.date))];
    return this.getDataGroupedByInterval(days, this.state.data);
  };

  groupDataByWeek = () => {
    const dataWithWeekAsDate = this.state.data.map(item => ({
      ...item,
      date: moment(item.date).format(this.intervalFormats.get('week'))
    }));
    const weeks = [...new Set(dataWithWeekAsDate.map(item => item.date))];
    return this.getDataGroupedByInterval(weeks, dataWithWeekAsDate);
  };

  groupDataByMonth = () => {
    const dataWithMonthAsDate = this.state.data.map(item => ({
      ...item,
      date: moment(item.date).format(this.intervalFormats.get('month'))
    }));
    const months = [...new Set(dataWithMonthAsDate.map(item => item.date))];
    return this.getDataGroupedByInterval(months, dataWithMonthAsDate);
  };

  groupDataByQuarter = () => {
    const dataWithQuarterAsDate = this.state.data.map(item => ({
      ...item,
      date: moment(item.date).format(this.intervalFormats.get('quarter'))
    }));
    const quarters = [...new Set(dataWithQuarterAsDate.map(item => item.date))];
    return this.getDataGroupedByInterval(quarters, dataWithQuarterAsDate);
  };

  groupDataByYear = () => {
    const dataWithYearAsDate = this.state.data.map(item => ({
      ...item,
      date: moment(item.date).format(this.intervalFormats.get('year'))
    }));
    const years = [...new Set(dataWithYearAsDate.map(item => item.date))];
    return this.getDataGroupedByInterval(years, dataWithYearAsDate);
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
