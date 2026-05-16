///similiar to create product
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
// import { useEffect, useState } from 'react'
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import '../../styles/dashbrd.css'
const { Option } = Select;


const UpdateProduct = () => {
//   return (
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shiping, setShiping] = useState("");
    const [id,setId]=useState("")
//this setId is included because ctegory is populated on the basis of id

//delete produc
const handleDelete=async()=>{
    try{
        let answer;
        answer=window.prompt('are you sure to delete this product')
        if(!answer)return
       const {data}=await axios.delete(`/api/v1/product/delete-product/${id}`);
      //  const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
       if(data.success){
        toast.success('product deleted successfully')
        navigate("/dashboard/admin/products");
       }
    }catch(error){
        console.log(error)
        toast.error('not deleted yet')
    }
}


//get single product
const getSingleProduct=async()=>{
    try{
    //  const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
     const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
     setName(data.product.name);
     setId(data.product._id)
     setCategory(data.product.category._id);
     setPrice(data.product.price);
     setQuantity(data.product.quantity);
    //  setQuantity(data.product.quantity);
     setDescription(data.product.description);
     setShiping(data.product.shiping);
     console.log(data.product.name);
    }catch(error){
        console.log(error)
    }
}
useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
},[])

    //get all category
    const getAllCategory = async () => {
      try {
        //send network request with the help of axios
        const { data } = await axios.get(
          `/api/v1/category/get-category`
        );
        // const { data } = await axios.get(
        //   `${process.env.REACT_APP_API}/api/v1/category/get-category`
        // );
        if (data?.success) {
          setCategories(data?.category);
          toast.success("getting all ctaegory");
        }
        <h1>mahadev</h1>;
      } catch (error) {
        console.log(error);
        toast.error("something went wrong in getting category");
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    ////cfreate a product
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        //we can also use instead of formData than wrap all input and select tag with in form and
        //add handle create on form on submit event
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo&&productData.append("photo", photo);
        productData.append("category", category);
        const { data } = await axios.put(
          `/api/v1/product/update-product/${id}`,
          productData
        );
        // const { data } = await axios.put(
        //   `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        //   productData
        // );
        if (data?.success) {
              navigate("/dashboard/admin/products");
            toast.success(data?.message);
        } else {
            toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("error while updating a product");
      }
    };
  
    return (
      <Layout title={"DashBoard Create-Product"}>
        <div className="containe-fluid m-3 p-3 dashbrd">
          <div className="row">
            <div className="col md-3">
              <AdminMenu />
            </div>
            <div className="col md-9 p-3">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="select category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}

                  //adding value will help us to populate it
                  value={category}
                //   value={category.name}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
  
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "upload photo"}
                    {/* image/* means aalll extension of photo can be accepted */}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                {/* <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div> */}
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ):(
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>

                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShiping(value);
                    }}
                    value={shiping?'yes':'no'}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                  {/* <button
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                          onClick={handleDelete}
                        ></button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

  )
}

export default UpdateProduct