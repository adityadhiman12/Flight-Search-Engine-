import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DatePicker from "react-datepicker";
import moment from "moment";
import { items } from "../../data/data";
import CustSlider from "../CustSlider/CustSlider";
import ItemPage from "../ItemPage/ItemPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "",
      originCity: "",
      destCity: "",
      deptDate: "",
      retDate: "",
      passengerCount: 1,
      items: items
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOriginCity = this.handleChangeOriginCity.bind(this);
    this.handleChangeDestCity = this.handleChangeDestCity.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handlePassengerCountChange = this.handlePassengerCountChange.bind(
      this
    );
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleChangeSlider = this.handleChangeSlider.bind(this);
    this.filterByPrice = this.filterByPrice.bind(this);
    this.findByMatchingProperties = this.findByMatchingProperties.bind(this);

    moment.updateLocale("en", {
      calendar: {
        sameElse: "Do MMM YYYY"
      }
    });
  }

  handleSelect(index, last) {
    this.setState({
      selectedTab: index
    });
  }
  handleSubmit(event) {
    alert("Results filtered");
    event.preventDefault();
  }
  handleChangeOriginCity(event) {
    const objToMatch = {
      originCity: event.target.value
    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);
    if (filteredData.length !== 0) {
      this.setState({
        originCity: event.target.value,
        items: filteredData
      });
    }
  }
  handleChangeDestCity(event) {
    const destCity = event.target.value ? event.target.value : "";
    const objToMatch = {
      originCity: this.state.originCity,
      destCity: destCity
    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);

    if (filteredData.length !== 0) {
      this.setState({
        destCity: event.target.value,
        items: filteredData
      });
    }
  }
  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  handlePassengerCountChange(event) {
    this.setState({ passengerCount: event.target.value });
  }
  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  handleChangeSlider(obj) {
    this.setState({
      sliderRangeObj: obj
    });

    const objToMatch = {
      originCity: this.state.originCity
    };

    let filteredData = this.findByMatchingProperties(items, objToMatch);
    filteredData = filteredData.filter(this.filterByPrice);

    this.setState({
      items: filteredData
    });
  }

  filterByPrice(item) {
    return (
      item.price >= this.state.sliderRangeObj.lowerBound &&
      item.price <= this.state.sliderRangeObj.upperBound
    );
  }

  findByMatchingProperties(arrObj, matchingObj) {
    return arrObj.filter(function(entry) {
      return Object.keys(matchingObj).every(function(key) {
        return (
          entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0
        );
      });
    });
  }

  render() {
    var originCity = this.state.originCity ? this.state.originCity : "";
    var destCity = this.state.destCity ? this.state.destCity : "";
    var headerElem = "";
    var startDate = this.state.startDate
      ? "Depart: " + this.state.startDate.toString().slice(4, 15)
      : "";
    if (!!originCity && !!destCity) {
      headerElem = (
        <div>
          <h5>
            {" "}
            {this.state.originCity} > {this.state.destCity}{" "}
          </h5>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Flight Search Engine</h2>
        </div>
        <div className="container">
          <div className="one-third column">
            <Tabs onSelect={this.handleSelect}>
              <TabList>
                <Tab>One Way</Tab>
                <Tab>Return</Tab>
              </TabList>

              <TabPanel>
                <div className="Item">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      className="row"
                      type="text"
                      value={this.state.originCity}
                      onChange={this.handleChangeOriginCity}
                      placeholder="Enter Origin City"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.destCity}
                      onChange={this.handleChangeDestCity}
                      placeholder="Enter Destination City"
                    />
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Departure Date"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.passengerCount}
                      onChange={this.handlePassengerCountChange}
                      placeholder="Passengers"
                    />
                    <input type="submit" value="Search" />
                  </form>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="Item">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      className="row"
                      type="text"
                      value={this.state.originCity}
                      onChange={this.handleChangeOriginCity}
                      placeholder="Enter Origin City"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.destCity}
                      onChange={this.handleChangeDestCity}
                      placeholder="Enter Destination City"
                    />
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Departure Date"
                    />
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      minDate={moment()}
                      maxDate={moment().add(90, "days")}
                      placeholderText="Return Date"
                    />
                    <input
                      className="row"
                      type="text"
                      value={this.state.passengerCount}
                      onChange={this.handlePassengerCountChange}
                    />
                    <input className="row" type="submit" value="Search" />
                  </form>
                </div>
              </TabPanel>
            </Tabs>

            <div>
              <div className="label">
                <label>
                  <h5>Refine Flight Search</h5>
                </label>
                <CustSlider onChange={this.handleChangeSlider} />
              </div>
            </div>
          </div>

          <div className="two-thirds column">
            <div className="header">
              <div className="Item-left">{headerElem}</div>
              <div className="Item-right">{startDate}</div>
            </div>

            <main>
              <ItemPage
                items={this.state.items}
                onAddToCart={this.handleAddToCart}
              />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
