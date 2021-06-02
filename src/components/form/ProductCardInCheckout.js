import React from "react";
import ModalImage from "react-modal-image";
import sneaker from "../../img/defaultimage.jpeg";
import { useDispatch } from "react-redux";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
  } from "@ant-design/icons";
import { toast } from "react-toastify";

const ProductCardInCheckout = ({ p }) => {
  // const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const sizes = ["7M", "8M", "8.5M", "9M", "11M"];
  let dispatch = useDispatch();

  const handleSizeChange = (e) => {
    console.log("size changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          // cart[i].color = e.target.value;
          cart[i].size = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };
  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.info(`Stock available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={sneaker} large={sneaker} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleSizeChange}
            name="size"
            className="form-control"
            style={{width:"5.2vw"}}
          >
            {p.size ? (<option value={p.size}>{p.size}</option>):(<option>Select</option>)}
            {sizes.filter((c) => c !== p.size).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>

        <td>
        {console.log("this is ",typeof p.count )} 
        <input type="number" style={{width:"60px"}} className="form-control" value={p.count} onChange={handleQuantityChange}/>
        </td>

        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>

        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>

      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
