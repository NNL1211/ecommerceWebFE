import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { categoryActions } from "../redux/actions/category.action";
import ProductCard from "../components/form/ProductCard";
import { useDispatch, useSelector } from "react-redux";

const CategoryHome = () => {

  const [category, setCategory] = useState({});
  const [products,setProducts ] = useState([]);
  const loading = useSelector((state)=> state.category.loading)
  const categoryData= useSelector((state)=>state.category.singleCategory.data)
  console.log(categoryData)
  const {slug} = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(categoryActions.getSingleCategory(slug))
  }, []);

  useEffect(() => {
   if(categoryData && categoryData.data){
    setCategory(categoryData.data.category)
    setProducts(categoryData.data.products)
   }
  }, [categoryData]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
