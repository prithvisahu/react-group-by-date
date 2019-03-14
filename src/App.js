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

    const dataGroupedByDays = this.getDataGroupedByInterval(
      days,
      this.state.data
    );

    return dataGroupedByDays;
  };

  groupDataByWeek = () => {
    const dataWithWeekAsDate = this.state.data.map(item => {
      const weekOfYear = moment(item.date).format('YYYY-ww');
      return { ...item, date: weekOfYear };
    });

    const weeks = [...new Set(dataWithWeekAsDate.map(item => item.date))];

    const dataGroupedByWeek = this.getDataGroupedByInterval(
      weeks,
      dataWithWeekAsDate
    );

    return dataGroupedByWeek;
  };

  groupDataByMonth = () => {
    const dataWithMonthAsDate = this.state.data.map(item => {
      const monthOfYear = moment(item.date).format('YYYY-MM');
      return { ...item, date: monthOfYear };
    });

    const months = [...new Set(dataWithMonthAsDate.map(item => item.date))];

    const dataGroupedByMonth = this.getDataGroupedByInterval(
      months,
      dataWithMonthAsDate
    );

    return dataGroupedByMonth;
  };

  groupDataByQuarter = () => {
    const dataWithQuarterAsDate = this.state.data.map(item => {
      const quarterOfYear = moment(item.date).format('YYYY-Q');
      return { ...item, date: quarterOfYear };
    });

    const quarters = [...new Set(dataWithQuarterAsDate.map(item => item.date))];

    const dataGroupedByQuarter = this.getDataGroupedByInterval(
      quarters,
      dataWithQuarterAsDate
    );

    return dataGroupedByQuarter;
  };

  groupDataByYear = () => {
    const dataWithYearAsDate = this.state.data.map(item => {
      const yearOfYear = moment(item.date).format('YYYY');
      return { ...item, date: yearOfYear };
    });

    const years = [...new Set(dataWithYearAsDate.map(item => item.date))];

    const dataGroupedByYear = this.getDataGroupedByInterval(
      years,
      dataWithYearAsDate
    );

    return dataGroupedByYear;
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
