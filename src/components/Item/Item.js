import React from "react";
import "./Item.css";
import logo from "./download.jpeg";

let Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
      <h5>Rs. {item.price}</h5>
      <div>{item.name}</div>
      <div className="Item-price">
        {item.originCity} > {item.destinationCity}{" "}
      </div>
      <div className="Item-description">Depart: {item.departureDate}</div>
      <div className="Item-description">DepartTime: {item.departureTime}</div>
    </div>

    <div className="Item-right">
      <div className="Item-image">
        <img src={logo} className="Item-logo" alt="logo" />
      </div>
      <button className="Item-book" onClick={item.onClickHandler} type="submit">
        Book this flight
      </button>
      {children}
    </div>
  </div>
);

Item.onClickHandler = event => {
  alert("Flight booked successfully :)");
  event.preventDefault();
};

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.node
};

export default Item;
