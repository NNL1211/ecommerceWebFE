import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const SingleProductList = ({ values }) => {
  const {
    title,
    price,
    category,
    shipping,
    brand,
    quantity,
    sold,
  } = values;

  return (
    <>
    <ListGroup variant="flush">
    
      <ListGroup.Item> <h2 className="tesnp">{title}</h2> </ListGroup.Item>
      <ListGroup.Item> Price:{" "} ${price} </ListGroup.Item>
      {category && (
        <ListGroup.Item className="list-group-item">
          Category:{" "}
          <Link to={`/category/${category.slug}`}>
            {category.name}
          </Link>
        </ListGroup.Item>
      )}
      <ListGroup.Item>Shipping:{" "} {shipping}</ListGroup.Item>
      <ListGroup.Item>Brand:{" "} {brand} </ListGroup.Item>
      <ListGroup.Item>Available:{" "} {quantity}</ListGroup.Item>
      <ListGroup.Item>Sold:{" "} {sold}</ListGroup.Item>
    </ListGroup>
  </>
  );
};

export default SingleProductList;
