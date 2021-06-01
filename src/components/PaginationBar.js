import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ProductActions } from "../redux/actions/product.action";
import { categoryActions } from "../redux/actions/category.action";

const PaginationBar = ({ currentPage,someboolen,setSomeboolen,filter, totalPage }) => {
  let dispatch = useDispatch();

  const handleClick = (page) => {
      console.log("????",someboolen)
    if(someboolen){
        dispatch(ProductActions.fetchProductsByFilter(filter,page))
    }else{
        dispatch(ProductActions.getAllProducts(page))
    }
    
    // fetch categories
    dispatch(categoryActions.getCategory())
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickOnNext = () => {
    if(someboolen && currentPage < totalPage){
        dispatch(ProductActions.fetchProductsByFilter(filter,currentPage+1))
    }else if(currentPage < totalPage) {
    dispatch(ProductActions.getAllProducts(currentPage + 1))
    dispatch(categoryActions.getCategory())
    }
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickOnPrev = () => {
    if(someboolen && currentPage > 1){
        dispatch(ProductActions.fetchProductsByFilter(filter,currentPage-1))
    }else if (currentPage > 1) {
      dispatch(ProductActions.getAllProducts(currentPage - 1))
    }
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(()=>{
    setSomeboolen(false)
  },[])
  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={handleClickOnPrev}
      />
      <Pagination.Item
        active={currentPage === 1}
        onClick={() => handleClick(1)}
      >
        {1}
      </Pagination.Item>

      {currentPage - 2 > 1 && <Pagination.Ellipsis />}

      {currentPage - 1 > 1 && (
        <Pagination.Item
          active={currentPage === currentPage - 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}
      {currentPage > 1 && currentPage < totalPage && (
        <Pagination.Item active>{currentPage}</Pagination.Item>
      )}
      {currentPage + 1 < totalPage && (
        <Pagination.Item
          active={currentPage === currentPage + 1}
          onClick={() => handleClick(currentPage + 1)}
        >
          {currentPage + 1}
        </Pagination.Item>
      )}

      {totalPage > currentPage + 2 && <Pagination.Ellipsis />}

      {totalPage > 1 && (
        <Pagination.Item
          active={currentPage === totalPage}
          onClick={() => handleClick(totalPage)}
        >
          {totalPage}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={handleClickOnNext}
      />
    </Pagination>
  );
};

export default PaginationBar;
