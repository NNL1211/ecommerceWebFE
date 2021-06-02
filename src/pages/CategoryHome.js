import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { categoryActions } from "../redux/actions/category.action";
import ProductCard from "../components/form/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Navbar2 from '../components/Navbar2'
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
    <>
    <Navbar2/>
    <div className="container-fluid product--detail--page">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <p className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </p>
          )}
        </div>
      </div>

      <div className="row pb-5">
        {products.map((product) => (
          <div className="col-md-3 mt-3" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="row">
          {/* <Pagination
            current={currentPage}
            total={totalpage*10}
            onChange={(value) => setPage(value)}
          /> */}
          {/* <PaginationBar 
            setSomeboolen={setSomeboolen}
            filter = {filter}
            someboolen={someboolen}          
            currentPage={currentPage}
            totalPage={totalpage}/> */}
          </div>
    </div>
    </>
  );
};

export default CategoryHome;
