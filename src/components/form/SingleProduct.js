import React,{ useState,useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import {userActions} from '../../redux/actions/user.action'
import { routeActions } from "../../redux/actions/route.action";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'antd/dist/antd.css';
import sneaker from '../../img/defaultimage.jpeg'
import SingleProductList from "./SingleProductList";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Button } from "react-bootstrap";


// const { Meta } = Card;

const { TabPane } = Tabs;
const SingleProduct = ({ values }) => {
  const history = useHistory();
  const [tooltip, setTooltip] = useState("Click to add");
  const { title, description, images,_id,quantity} = values;
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();
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
        ...values,
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    dispatch(userActions.addToWishlist({_id}))
  };
  
  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
    //   history.go(0)
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, redirectTo]);  

  return (
    <>
    <div className="col-md-6">
      {images && images.length ? (
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img  src={i.url} key={i.public_id} />)}
        </Carousel>
      ) : (
        <Card cover={<img src={sneaker} className="mb-3 card-image" />}></Card>
      )}

      <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
      </Tabs>
    </div>

    <div className="col-md-6 product-info">
    <SingleProductList values={values} />
    <div>

    <Tooltip title={tooltip}>
              <Button variant="secondary" size="lg" onClick={quantity<1?null:handleAddToCart} disabled={quantity<1}>
                <ShoppingCartOutlined className="text-danger" /> <br /> 
                {quantity<1?'Out of Stock':'Add to Cart'}
              </Button>
    </Tooltip>
    <Link to="/" onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
      </Link>,
    </div>
    </div>
  </>
  );
};

export default SingleProduct;
