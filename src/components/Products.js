import React, { useEffect, useState } from "react";
import "../App.css";
import axios, { all } from "axios";
import ProductNotFound from "./ProductNotFound";
import { Navigate,useNavigate } from "react-router-dom";

function Products(props) {

    const [products, setProducts] = useState([])
    const [productName,setProductName] = useState("")
    const[filterProducts,setFilterProducts] = useState([])
    const [category,setCategory] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
        .then(res => {
            setProducts(res.data.products)
            let allCategories = res.data.products.map((item,i) => {
                return item.category
            })

            setCategory([...new Set(allCategories)]);
            
        }   
        )
       
    },[])

    useEffect(() => {
       let productsCopy = [...products]
       let result =productsCopy.filter((item,i) => {
        if(item.title.toLowerCase().includes(productName.toLowerCase()) == true){
            return true;
        }
       }) 
       setFilterProducts(result);
       console.log(category);
    },[productName])

   const handleSort = (e) => {
    let productCopy = [...products]
    if(e.target.value == "select all"){
        setFilterProducts(productCopy)
    }
    else if(e.target.value == "less than 20$"){
        let filterProductsCopy = [...filterProducts]
        if(filterProducts.length > 0){
            let result = filterProductsCopy.filter((item,i) => item.price < 20)
            setFilterProducts(result);
        }else{
            let result = productCopy.filter((item,i) => item.price < 20)
            setFilterProducts(result);
        }
        
    } else if(e.target.value == "more than 100$"){
        let filterProductsCopy = [...filterProducts]
        if(filterProducts.length > 0){
            let result = filterProductsCopy.filter((item,i) => item.price > 100)
            setFilterProducts(result);
        }else{
            let result = productCopy.filter((item,i) => item.price > 100)
            setFilterProducts(result);
        }
        
    }else if(e.target.value == "rating high to low"){
        let result = productCopy.sort((a,b) => b.rating - a.rating)
        setFilterProducts(result);
    }else if(e.target.value == "price low to high"){
        let result = productCopy.sort((a,b) => a.price - b.price)
        setFilterProducts(result);
    }
   }

   const handleCategory = (e) => {
    let filterProductsCopy = [...filterProducts]
        if(filterProducts.length > 0){
            let result = filterProductsCopy.filter((item,i) => item.category == e.target.value)
            setFilterProducts(result);
        }else{
            let productCopy = [...products]
            let result = productCopy.filter((item,i) => item.category == e.target.value)
            setFilterProducts(result)
        }
   
    
   }
   
   const handleSpecification = (id) => {
    
    navigate(`/products/${id}`)
    
   }
  
  return (
    <div id="products">
        <div style={{ textAlign: "center" }}>
        <h1 >Products Store</h1>
        <input type="text" placeholder="Type to Search" 
        value={productName}
        onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div style={{display:"flex"}}>
        <div style={{marginRight:"30px"}}>
        <b>SORT</b> <br/>
        <select name="" id="" onChange={(e) => handleSort(e)}>
            <option value="select all">Select All</option>
            <option value="less than 20$">less than 20$</option>
            <option value="more than 100$">more than 100$</option>
            <option value="rating high to low">rating high to low</option>
            <option value="price low to high">price low to high</option>
        </select>
        </div>
        <div>
            <b>CATEGORY</b><br/>
        <select name="" id=""  onChange={(e) => handleCategory(e)}>
            <option value="">Select Category</option>
            {category.map((item,i) => {
                return <option value={item}>{item}</option>
            })}
        </select>
        </div>
        </div>
       
        
      {productName != "" && filterProducts.length == 0 ? <ProductNotFound/> : "" } 
      <div class="row row-cols-1 row-cols-sm-3 row-cols-md-4 g-4">
        {filterProducts.length == 0 && productName == ""? products.map((item,i) => {
            return (    <div class="col single_card">
                <div class="card ">
                  <img src={item.thumbnail} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <h6>Price: Rs {item.price}</h6>
                    <h6>Rating: {item.rating}/10</h6>
                    <h6>category: {item.category}</h6>
                    <p class="card-text"> {item.description.slice(0,100)}</p>
                    <button onClick={() => handleSpecification(item.id)} >More Details</button>
                  </div>
                </div>
              </div>)
        }) : filterProducts.map((item,i) => {
            return (    <div class="col single_card">
                <div class="card ">
                  <img src={item.thumbnail} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <h6>Price: Rs {item.price}</h6>
                    <h6>Rating: {item.rating}/10</h6>
                    <h6>category: {item.category}</h6>
                    <p class="card-text">
                    {item.description.slice(0,100)}
                    </p>
                    <button >More Details</button>
                  </div>
                </div>
              </div>)
        })}
    
      </div>
    </div>
  );
}

export default Products;
