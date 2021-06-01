import React,{ useState, useEffect } from 'react'
// import Navbar2 from "../../../components/Navbar2";
import { useSelector,useDispatch } from "react-redux";
import {categoryActions} from '../../../redux/actions/category.action'
import { toast } from "react-toastify";
import { useHistory, useParams } from 'react-router';

const CategoryUpdate = () => {
    const history = useHistory();
    const loading = useSelector((state) => state.category.loading);
    const categoryBrands = useSelector((state)=>state.category.singleCategory.data)
    // console.log("this is ",categoryBrands)
    const [category, setCategory] = useState({ name: "",});
    // console.log("new name ?",category)
    const dispatch = useDispatch()
    const {slug}= useParams();
    const handleChange = (e)=>{
        setCategory({...category,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const { name} = category;
        if(name===" "){
            toast.error(`"${name}" is wrong type`);
        }else{
            dispatch(categoryActions.updateCategory(slug,{ name}))
            // toast.success(`"${name}" is updated`);
        }
        history.push("/admin/category")

    }
    useEffect(() => {
        dispatch(categoryActions.getSingleCategory(slug))
        if(categoryBrands && categoryBrands.data.category ){
            // console.log(categoryBrands.data.category.name)
            setCategory({name:categoryBrands.data.category.name})
        }
        
      }, []);
    useEffect(() => {
        if(categoryBrands && categoryBrands.data.category ){
            // console.log(categoryBrands.data.category.name)
            setCategory({name:categoryBrands.data.category.name})
        }
        
      }, [categoryBrands]);
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            {/* <Navbar2 /> */}
          </div>
          <div className="col">
            {loading ? (
              <h4 className="text-danger">Loading..</h4>
            ) : (
              <h4>Update category</h4>
            )}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Name</label>
            <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            value={category.name}
            autoFocus
            required/>
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
            <hr />
          </div>
        </div>
      </div>
    )
}

export default CategoryUpdate
