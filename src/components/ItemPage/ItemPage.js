import React from "react";
import Item from "../Item/Item";
import "./ItemPage.css";

function ItemPage({ items }) {
  let length = items.length;
  if (length > 0) {
    return (
      <ul className="ItemPage-items">
        {items.map(item => (
          <li key={item.id} className="ItemPage-item">
            <Item item={item}></Item>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul className="ItemPage-items">
        <label>
          <h5>There are no flights available.</h5>
        </label>
      </ul>
    );
  }
}
ItemPage.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default ItemPage;
