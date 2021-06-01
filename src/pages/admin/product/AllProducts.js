import React, { useEffect,useState } from 'react'
import AdminSideBar from '../../../components/AdminSideBar'
import { useDispatch, useSelector } from "react-redux";
import {ProductActions} from "../../../redux/actions/product.action"
import AdminProductCard from "../../../components/form/AdminProductCard";
import Navbar2 from '../../../components/Navbar2'
import PaginationBar from "../../../components/PaginationBar";
const AllProducts = () => {
  const [filter,setFilter] = useState({})
  const [someboolen, setSomeboolen] = useState(false);
  const [totalpage, setTotalPage] = useState(1);
  const dispatch = useDispatch();
  const currentPage = useSelector((state)=>state.product.currentPage)
  const productlist = useSelector((state)=>state.product.products.data)
  const loading = useSelector((state) => state.product.loading);
  console.log(productlist)
  useEffect(()=>{
    dispatch(ProductActions.getAllProducts(1));
},[])
    const handleRemove = (id) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
    dispatch(ProductActions.deleteProduct(id));
    }
  };
    return (
        <>
        <Navbar2/>
        <div className="container-fluid admin--page">
        <div className="row">
          <div className="col-md-2 pt-2">
            <AdminSideBar />
          </div>
          <div className="col-md-10 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>All Products</h4>
              )}
          <div className="row pb-5">
            {productlist && productlist.data.products.map((product) => (
              <div key={product._id} className="col">
                <AdminProductCard product={product} handleRemove={handleRemove}/>
              </div>
            ))}</div>
          <div className="row">
          <PaginationBar 
            setSomeboolen={setSomeboolen}
            filter = {filter}
            someboolen={someboolen}          
            currentPage={currentPage}
            totalPage={totalpage}/>
          </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default AllProducts
