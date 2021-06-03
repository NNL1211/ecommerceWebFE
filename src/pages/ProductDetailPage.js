import React, { useEffect, useState } from "react";
import {ProductActions} from "../redux/actions/product.action"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from 'react-router';
import SingleProduct from "../components/form/SingleProduct";
import ProductCard from "../components/form/ProductCard";
import Navbar2 from '../components/Navbar2'

const ProductDetailPage = () => {
const dispatch = useDispatch()
const {id}=useParams()
const singleProduct = useSelector((state)=>state.product.singleProduct.data)
const relatedProducts = useSelector((state)=>state.product.relatedProducts.data)
const [related, setRelated] = useState([]);
console.log(related)
const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    images: [],
    sizes: ["7M", "8M", "8.5M", "9M", "11M"],
    brands: ["Nike", "Jordan", "Adidas", "Puma", "Vans"],
    size: "",
    brand: "",
};
const [values, setValues] = useState(initialState);
const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    images,
    sizes,
    brands,
    size,
    brand,
} = values;
useEffect(()=>{
    if(singleProduct && singleProduct.product ){
        setValues( singleProduct.product );   
    }
},[singleProduct])

useEffect(()=>{
  if(relatedProducts && relatedProducts.related ){
    setRelated( relatedProducts.related );   
  }
},[relatedProducts])
useEffect(() => {
    dispatch(ProductActions.getSingleProduct(id))
    dispatch(ProductActions.getRelated(id))
  }, [id]);
    return (
      <>
      <Navbar2/>
        <div className="container-fluid  product--detail--page">
        <div className="row pt-4">
          <SingleProduct values={values } />
        </div>
  
        {/* <hr/> */}
        <div className="text-center">
        <h2 className="title" >Related Products</h2>
        </div>
        <div className="row pb-5 ">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-3 mt-3">
              <ProductCard product={r} />
            </div>
          ))
          ) : (
            <div className="text-center col">No Products Found</div>
            )}
        </div>
      </div>
      </>
    )
}

export default ProductDetailPage
