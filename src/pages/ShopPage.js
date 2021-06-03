import React, { useState, useEffect } from "react";
import { categoryActions } from "../redux/actions/category.action";
import { ProductActions } from "../redux/actions/product.action";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/form/ProductCard";
import PaginationBar from "../components/PaginationBar";
import Search from '../components/form/Search'
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
    DollarOutlined,
    DownSquareOutlined,
  } from "@ant-design/icons";
import Navbar2 from '../components/Navbar2'
// import { Form } from "react-bootstrap";
// import { Pagination } from "antd";


const ShopPage = (props) => {
    // const {...other} = props;
    const [filter,setFilter] = useState({})
    const [someboolen, setSomeboolen] = useState(false);
    const [totalpage, setTotalPage] = useState(1);
    console.log("this is total page",totalpage)
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    const loading = useSelector((state)=> state.product.loading)
    const productsData = useSelector((state)=>state.product.products.data)
    const currentPage = useSelector((state)=>state.product.currentPage)
    const productsDataFilter = useSelector((state)=>state.product.filterProducts.data)
    console.log("this is productdatafilter",productsDataFilter)
    const categoriesData = useSelector((state)=>state.category.categories.data)
    const [price, setPrice] = useState([0, 0]);
    const [products, setProducts] = useState([]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [brands, setBrands] = useState(["Nike", "Jordan", "Adidas", "Puma", "Vans"]);
    const [brand, setBrand] = useState("");
    const [sizes, setSizes] = useState(["7M", "8M", "8.5M", "9M", "11M"]);
    const [size, setSize] = useState("");

    const fetchProducts = (arg) => {
        dispatch(ProductActions.fetchProductsByFilter(arg,1))
        setSomeboolen(true)
      };
    
    // 2. load products on user search input
    useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      setFilter({ query: text })
      if (!text) {
        setSomeboolen(false)
        dispatch(ProductActions.getAllProducts(currentPage))
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

    // 3. load products based on price range
    useEffect(() => {
        console.log("ok to request");
        fetchProducts({ price });
        setFilter({price})
        }, [ok]);

    useEffect(() => {
        dispatch(ProductActions.getAllProducts(currentPage))
        // fetch categories
        dispatch(categoryActions.getCategory())
        setSomeboolen(false)
      }, []);
      

    useEffect(() => {
        if(productsData && productsData.data){
            console.log("this is productdata",productsData)
            setProducts( productsData.data.products)
            setTotalPage(productsData.data.totalPages)
        }

      }, [productsData]);

      useEffect(() => {
        if(productsDataFilter && productsDataFilter.data){
            // console.log("this is productdata",productsDataFilter)
            setProducts( productsDataFilter.data.products)
            setTotalPage(productsDataFilter.data.totalPages)
        }

      }, [productsDataFilter]);

      useEffect(() => {
       if(categoriesData && categoriesData.data){
            console.log("this is category data",categoriesData)
            setCategories(categoriesData.data.totalCategorys)
       }
      }, [categoriesData]);
      
      const handleSlider = (value) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
    
        // reset
        setCategoryIds([]);
        setPrice(value);
        setBrand("");
        setSize("");
        setTimeout(() => {
          setOk(!ok);
        }, 300);
      };
    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = (categories) =>
    categories.map((c) => (
                <div  key={c._id}>
                <Checkbox
                    key={c._id}
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
                </div>
            ));


  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setBrand("");
    setSize("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
    setFilter({category: inTheState})
  };

   // 7. show products based on brand name
   const showBrands = (brands) =>
   brands.map((b) => (
     <Radio
       key={b}
       value={b}
       name={b}
       checked={b === brand}
       onChange={handleBrand}
       className="pb-1 pl-4 pr-4"
     >
       {b}
     </Radio>
   ));

    const handleBrand = (e) => {
    dispatch({
     type: "SEARCH_QUERY",
     payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSize("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
    setFilter({brand: e.target.value})
    };

    // 8. show products based on color
    const showSizes = (sizes) =>
    sizes.map((c) => (
    <Radio
      key={c}
      value={c}
      name={c}
      checked={c === size}
      onChange={handleSize}
      className="pb-1 pl-4 pr-4"
    >
      {c}
    </Radio>
  ));

    const handleSize = (e) => {
    dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setSize(e.target.value);
    fetchProducts({ size: e.target.value });
    setFilter({size: e.target.value})
};

                    


    return (
      <>
      <Navbar2/>
      <div className="container-fluid shoppage">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <Search/>
          <hr />

          <Menu
            // defaultOpenKeys={["1", "2", "3", "4"]}
            mode="inline"
          >
            {/* price */}
            <Menu.SubMenu
              key="sub1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
          
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </Menu.SubMenu>

            {/* category */}
            <Menu.SubMenu
              key="sub2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
         
            >
              <div style={{ maringTop: "-10px" }}>{showCategories(categories)}</div>
            </Menu.SubMenu>



            {/* brands */}
            <Menu.SubMenu
              key="sub3"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands(brands)}
              </div>
            </Menu.SubMenu>

            {/* sizes */}
            <Menu.SubMenu
              key="sub4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sizes
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showSizes(sizes)}
              </div>
            </Menu.SubMenu>

   
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="title--shoppage">Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mt-3">
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

export default ShopPage
