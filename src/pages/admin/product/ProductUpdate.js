import React,{ useState, useEffect } from 'react'
import AdminSideBar from "../../../components/AdminSideBar";
// import Navbar2 from "../../../components/Navbar2";
import { useSelector,useDispatch } from "react-redux";
import {ProductActions} from '../../../redux/actions/product.action'
import {categoryActions} from '../../../redux/actions/category.action'
// import {cloudinaryActions} from '../../../redux/actions/cloudinary.action'
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import ReactLoading from 'react-loading';
// import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import FileUpload from "../../../components/form/FileUpload";
import { useParams } from 'react-router';

const ProductUpdate = () => {
    const {id}=useParams()
    const loading = useSelector((state) => state.cloudinary.loading);
    const categoryBrands = useSelector((state)=>state.category.categories.data)
    const singleProduct = useSelector((state)=>state.product.singleProduct.data)
    console.log("this is single product",singleProduct)
    const dispatch = useDispatch()

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
    // console.log("this is values",values)
    
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
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(ProductActions.updateProduct(values,id))
        // console.log("hereeeee")
      };
    
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(e.target.name, " ----- ", e.target.value);
      };
    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        console.log("EXISTING CATEGORY values.category", values.category);
        setValues({ ...values, [e.target.name]: e.target.value });

    };   
    useEffect(()=>{
        dispatch(ProductActions.getSingleProduct(id))
        if(singleProduct && singleProduct.product ){
            setValues({ ...values, ...singleProduct.product });   
        }
        dispatch(categoryActions.getCategory())
    },[])
    useEffect(()=>{
        if(singleProduct && singleProduct.product ){
            setValues({ ...values, ...singleProduct.product });   
        }
    },[singleProduct])
    console.log(category)
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
          <AdminSideBar />
          </div>

          <div className="col-md-10">
              {loading?(<ClipLoader  loading={loading}  size={150} />):(
                <h4>Product update</h4>)}
                {/* {JSON.stringify(values)} */}
            <hr />
    <div className="p-3">
      <FileUpload values={values} setValues={setValues} loading={loading} />
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Size</label>
        <select
          value={size}
          name="size"
          className="form-control"
          onChange={handleChange}
        >
          {sizes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={category._id}
        >
          {categoryBrands  &&
                    categoryBrands.data.totalCategorys.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>

          </div>
        </div>
      </div>
    )}

export default ProductUpdate
