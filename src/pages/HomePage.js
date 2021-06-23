import React, { useEffect,useState } from 'react'
// import { Container,Row,CardColumns, Col,Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
// import {Carousel} from'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from "react-redux";
import {ProductActions} from "../redux/actions/product.action"
import { categoryActions } from "../redux/actions/category.action";
import Header from "../components/Header";
import BackGroundHome from '../components/form/BackGroundHome'
// import ProductCard from "../components/form/ProductCard";
import user1 from "../images/user-1.png"
import user2 from "../images/user-2.png"
import user3 from "../images/user-3.png"
import sneaker from '../img/defaultimage.jpeg'

const HomePage = () => {
  const [category, setCategory] = useState({});
  const [productwithcategory,setProductwithcategory ] = useState([]);
  console.log(productwithcategory)
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const productlist = useSelector((state)=>state.product.products.data)
  const categoryData= useSelector((state)=>state.category.singleCategory.data)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  // console.log(productlist)
  useEffect(()=>{
      dispatch(ProductActions.getAllProducts(1));
      dispatch(categoryActions.getSingleCategory("basketball"))
  },[])
  useEffect(() => {
    if(categoryData && categoryData.data){
     setCategory(categoryData.data.category)
     setProductwithcategory(categoryData.data.products)
    }
   }, [categoryData]);

  useEffect(()=>{
    if(productlist && productlist.data.products ){
      setProducts(productlist.data.products)
    }
  },[productlist])
    return (
        <>
        <Header/>
        <div className="text-center container-fluid">
        {loading ? <h4>Loading...</h4> : <h2 className="title">Best For You</h2>}
        
        <div id="explore" className="container">
        <Carousel 
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        >
          {products.map((product) => (
          <div className="col-md-3 my-5" key={product._id}>
            <Link to={`/product/${product._id}`}>
            <img src={products ?product.images[0].url:sneaker}></img>
            <p className="titleh4">{product.title}</p>
            <p>${product.price}</p>
          </Link>
          </div>
          ))}
          </Carousel>
        </div> 
        <div className="container-fluid my-5 row">
          <BackGroundHome/>
        </div>
        <h2 className="title">Latest Products</h2>
        <div className="row">
        {productwithcategory.map((product) => (
          <div className="col-md-3 mt-3" key={product._id}>
            <Link to={`/product/${product._id}`}>
            <img src={productwithcategory ? product.images[0].url:sneaker}></img>
            <h4 className="titleh4">{product.title}</h4>
            <p>${product.price}</p>
          </Link>
          </div>
        ))}
        </div>

        </div>




        <div className="testimonial">
        <div className="container">
        <h2 className="title">Reviews</h2>
        <div className="row">
        <div className="col-md-4">
        <i className="fa fa-quote-left"></i>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <img src={user1}></img>
        <h3>Sean Parker</h3>
        </div>
        <div className="col-md-4">
        <i className="fa fa-quote-left"></i>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <img src={user2}></img>
        <h3>Mike Smith</h3>
        </div>
        <div className="col-md-4">
        <i className="fa fa-quote-left"></i>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        <img src={user3}></img>
        <h3>Mike Smith</h3>
        </div>
        </div>
        </div>
        </div>
        

        </>
    )
}

export default HomePage
