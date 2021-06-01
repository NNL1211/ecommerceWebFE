import React, { useEffect,useState } from 'react'
// import { Container,Row,CardColumns, Col,Card} from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {ProductActions} from "../redux/actions/product.action"
import Header from "../components/Header";
import ProductCard from "../components/form/ProductCard";
const HomePage = () => {
  
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const productlist = useSelector((state)=>state.product.products.data)
  // console.log(productlist)
  useEffect(()=>{
      dispatch(ProductActions.getAllProducts(1));
  },[])
  useEffect(()=>{
    if(productlist && productlist.data.products ){
      setProducts(productlist.data.products)
    }
  },[productlist])
    return (
        <>
        <Header/>
        <div className="jumbotron text-center">
        {loading ? <h4>Loading...</h4> : <h2>New Arrivals</h2>}
        </div>

        <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        </div> 
        </>
    )
}

export default HomePage
