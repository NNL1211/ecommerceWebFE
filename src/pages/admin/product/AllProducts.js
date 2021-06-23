import React, { useEffect,useState } from 'react'
import AdminSideBar from '../../../components/AdminSideBar'
import { useDispatch, useSelector } from "react-redux";
import {ProductActions} from "../../../redux/actions/product.action"
import AdminProductCard from "../../../components/form/AdminProductCard";
import Navbar2 from '../../../components/Navbar2'
import PaginationBar from "../../../components/PaginationBar";
import Search from "../../../components/form/Search";

const AllProducts = () => {
  const [filter,setFilter] = useState({})
  const [someboolen, setSomeboolen] = useState(false);
  const [totalpage, setTotalPage] = useState(1);
  const { search } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const { text } = search;
  const dispatch = useDispatch();
  const productsDataFilter = useSelector((state)=>state.product.filterProducts.data)
  const currentPage = useSelector((state)=>state.product.currentPage)
  const productlist = useSelector((state)=>state.product.products.data)
  const loading = useSelector((state) => state.product.loading);
  console.log(productlist)

  const fetchProducts = (arg) => {
    dispatch(ProductActions.fetchProductsByFilter(arg,1))
    setSomeboolen(true)
  };
      // 2. load products on user search input
  useEffect(() => {
        const delayed = setTimeout(() => {
          fetchProducts({ query: text });
          if (!text) {
            setSomeboolen(false)
            dispatch(ProductActions.getAllProducts(currentPage))
          }
        }, 300);
        return () => clearTimeout(delayed);
  }, [text]);

  useEffect(()=>{
    dispatch(ProductActions.getAllProducts(currentPage));
    setSomeboolen(false)
},[])
useEffect(() => {
  if(productsDataFilter && productsDataFilter.data){
      // console.log("this is productdata",productsDataFilter)
      setProducts( productsDataFilter.data.products)
      setTotalPage(productsDataFilter.data.totalPages)
  }

}, [productsDataFilter]);
// useEffect(() => {
//   if(productlist && productlist.data){
//       console.log("this is productdata",productlist)
      
//       setTotalPage(productlist.data.totalPages)
//   }

// }, [productlist]);

useEffect(() => {
  if(productlist && productlist.data){
      console.log("this is productdata",productlist)
      setProducts( productlist.data.products)
      setTotalPage(productlist.data.totalPages)
  }

}, [productlist]);
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
        <div className="container-fluid shoppage">
        <div className="row">
          <div className="col-md-3 pt-2">
            <AdminSideBar />
            <Search/>
          </div>
          <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>All Products</h4>
              )}
          <div className="row pb-5">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
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
