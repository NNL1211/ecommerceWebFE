import React, { useState } from 'react'
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import sneaker from '../../img/defaultimage.jpeg'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
const { Meta } = Card;
const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const dispatch = useDispatch();
    const { images, title, description, _id,price,quantity} = product;
    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
          // if cart is in local storage GET it
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          // push new product to cart
          cart.push({
            ...product,
            count: 1,
          });
          // remove duplicates
          let unique = _.uniqWith(cart, _.isEqual);
          // save to local storage
          // console.log('unique', unique)
          localStorage.setItem("cart", JSON.stringify(unique));
          // show tooltip
          setTooltip("Added");
    
          // add to reeux state
          dispatch({
            type: "ADD_TO_CART",
            payload: unique,
          });
          // show cart items in side drawer
          dispatch({
          type: "SET_VISIBLE",
          payload: true,
      });
        }
      };
    return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : sneaker}
            style={{ height: "200px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${_id}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={quantity<1?null:handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br />
              {quantity<1?'Out of Stock':'Add to Cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title}`}
          // description={`${description && description.substring(0, 40)}...`}
          />
          <br/>
          <h5>{`$${price}`}</h5>
      </Card>
    </>
    )
}

export default ProductCard
