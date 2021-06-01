import React,{ useState, useEffect } from 'react'
import AdminSideBar from "../../../components/AdminSideBar";
import Navbar2 from "../../../components/Navbar2";
import { useSelector,useDispatch } from "react-redux";
import {categoryActions} from '../../../redux/actions/category.action'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const CategoryCreate = () => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState({ name: "",});
    const [keyword, setKeyword] = useState("");
    const loading = useSelector((state) => state.category.loading);
    const categoryBrands = useSelector((state)=>state.category.categories.data)
    console.log(categoryBrands)
    const handleChange = (e)=>{
        setCategory({...category,[e.target.name]: e.target.value})
    }
    const handleSubmit =  (e)=>{
        e.preventDefault();
        const { name} = category;
        dispatch(categoryActions.createCategory({ name}))
        
        // toast.success(`"${name}" is created`);
        e.target.reset()
    }
    const handleRemove= (slug)=>{
        if (window.confirm("Delete?")) {
        dispatch(categoryActions.deleteCategory(slug))        
        // toast.error(`${slug} deleted`);     
    }}
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
        // console.log(e.target.value.toLowerCase())
      };
    const searched = (keyword) => (key) => {
        // console.log("this is key ",key)
       return key.name.toLowerCase().includes(keyword)};
    useEffect(()=>{
        dispatch(categoryActions.getCategory( ))
    },[dispatch])

    return (
        <>
        <Navbar2/>
        <div className="container-fluid admin--page">
        <div className="row">
          <div className="col-md-3 pt-2">
            <AdminSideBar />
          </div>
          <div className="col-md-9  pt-2">
            {loading ? (
                <h4 className="text-danger">Loading..</h4>
                ) : (
                    <h4>Create category</h4>
                    )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              autoFocus
              required
            />
            <br />
            <button className="btn btn-outline-primary">Save</button>
          </div>
          <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
          />
        </form>

            <hr />
            <div>

            
            {categoryBrands && categoryBrands.data.totalCategorys.filter(searched(keyword)).map((item) => (
            <div className="alert alert-secondary" key={item._id}>
              {item.name}
              <span
                onClick={() => handleRemove(item.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${item.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
          </div>
          </div>
          
        </div>
      </div>
    </>
    )
}

export default CategoryCreate
