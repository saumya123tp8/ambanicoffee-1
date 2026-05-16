// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import AdminMenu from '../../components/Layout/AdminMenu'

// const CreateCategory = () => {
//   return (
//     <Layout title={"DashBoard Create-category"}>
//       {/* <h1>category</h1> */}
//       <div className='containe-fluid m-3 p-3'>
//       <div className='row'>
//         <div className='col md-3'>
//           <AdminMenu/>
//         </div>
//         <div className='col md-9 p-3'>
//           <h1>Category</h1>
//         </div>
//       </div>
//       </div>
//     </Layout>
//   )
// }

// export default CreateCategory

///backend is involved

import React, { useEffect, useState } from "react";
import '../../styles/dashbrd.css'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd';
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName]=useState("")
  const [visible,setVisible]=useState(false)
  const [selected,setSelected]=useState(null)
  const [updatedName,setUpdatedName]=useState("")
//handle handle submit
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const {data} = await axios.post(`/api/v1/category/create-category`,{name});
    // const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name});
    if(data?.success){
      toast.success(`${name} is created`);
      getAllCategory()
    }else{
      toast.error(data.message);
    }
  }catch(error){
    console.log(error);
    toast.error('something went wrong category not created');
  }
}
  //get all c

  const getAllCategory = async () => {
    try {
      //send network request with the help of axios
      const {data} = await axios.get(`/api/v1/category/get-category`);
      // const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success){
        setCategories(data?.category);
        toast.success('getting all ctaegory')
      }
      <h1>mahadev</h1>
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  },[]);

//update category

const handleUpdate=async(e)=>{
  e.preventDefault();
  try{
  //  console.log(e)
  const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName});
  // const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName});
  if(data.success){
    toast.success(`${selected.name} is changed, now it is ${updatedName}`)
    setSelected(null)
    setUpdatedName("")
    setVisible(false)
    getAllCategory();
  }else{
    toast.error(data.message)
  }
  }catch(error){
    console.log(error)
    toast.error('category not updated due to error')
  }
}

//delete category

const handleDelete=async(pid)=>{
  try{
  //  console.log(e)
  const {data}=await axios.delete(`/api/v1/category/delete-category/${pid}`);
  // const {data}=await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
  if(data.success){
    toast.success(`category is deleted now`)
    getAllCategory();
  }else{
    toast.error(data.message)
  }
  }catch(error){
    console.log(error)
    toast.error('category not deleted due to error')
  }
}



  return (
    <Layout title={"DashBoard Create-category"}>
      {/* <h1>category</h1> */}
      <div className="containe-fluid m-3 p-3 dashbrd">
        <div className="row">
          <div className="col md-3">
            <AdminMenu />
          </div>
          <div className="col md-9 p-3">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                    {categories?.map(c=>(
                      <>
                  <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                      </td>
                      <td>
                        <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>delete</button>
                      </td>
                      
                  </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
               <CategoryForm handleSubmit={handleUpdate} value={updatedName}setValue={setUpdatedName}/>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory;


// import 'antd/dist/reset.css'