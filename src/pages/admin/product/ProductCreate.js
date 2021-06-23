import React,{ useState, useEffect } from 'react'
import AdminSideBar from "../../../components/AdminSideBar";
// import Navbar2 from "../../../components/Navbar2";
import { useSelector,useDispatch } from "react-redux";
import {ProductActions} from '../../../redux/actions/product.action'
import {categoryActions} from '../../../redux/actions/category.action'
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';
// import {cloudinaryActions} from '../../../redux/actions/cloudinary.action'
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import ReactLoading from 'react-loading';
// import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import FileUpload from "../../../components/form/FileUpload";
import Navbar2 from '../../../components/Navbar2';

const ProductCreate = () => {
    // const override = css`
    // display: block;
    // margin: 0 auto;
    // border-color: red;
    // `;
    const [color, setColor] = useState("#666666");
    const loading = useSelector((state) => state.cloudinary.loading);
    const categoryBrands = useSelector((state)=>state.category.categories.data)
    const dispatch = useDispatch()
    const initialState = {
        title: "",
        descriptioin: "",
        price: "",
        categories: [],
        category: "",
        subs: [],
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
        categories,
        category,
        subs,
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
        dispatch(ProductActions.createProduct(values))
        e.target.reset()
        // toast.success(`"" is created`);
      };
      
    const handleChange = (e) => {
        // setValues({ ...values, [e.target.name]: e.target.value,categories: categoryBrands.data.totalCategorys });
        setValues({ ...values, [e.target.name]: e.target.value});
        //
      };
    useEffect(()=>{
        dispatch(categoryActions.getCategory())
    },[dispatch])
    return (
        <>
        <Navbar2/>
        <div className="container-fluid admin--page--create">
        <div className="row">
          <div className="col-md-3 pt-2">
          <AdminSideBar />
          </div>
        
          <div className="col-md-9 pt-2">
              {loading?(<ClipLoader color={color}  loading={loading}  size={50} />):(
                <h4>Product create</h4>)}

            <hr />
            {/* {JSON.stringify(values.categories)} */}
            <div className="p-4">
            <FileUpload values={values} setValues={setValues} loading={loading} />
            </div>
            <div className="container-fluid">
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
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
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
                  name="size"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
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
                  name="brand"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
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
                    onChange={handleChange}
                    >
                    <option>Please select</option>
                    {categoryBrands  &&
                    categoryBrands.data.totalCategorys.map((c) => (
                      <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                        ))}
                    </select>
                </div>
                    
              <button className="btn btn-outline-info">Save</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default ProductCreate
