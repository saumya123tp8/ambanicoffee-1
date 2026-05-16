// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import Layout from "../../components/Layout/Layout";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import { Link } from "react-router-dom";
// ///get all products
// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const getAllProduct = async () => {
//     try {
//       // const { data } = await axios.get(
//       //   `${process.env.REACT_APP_API}/api/v1/product/get-product`
//       //   );
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-product`
//       );
//       // api/v1/product/get-product
//       setProducts(data.products);
//       // console.log(data)
//       toast.success("getting all product");
//       // if(data.success){
//       // }
//     } catch (error) {
//       console.log(error);
//       toast.error("error arises can,t get the product");
//     }
//   };

//   //ife cycle method to get all the oroducts in real time
//   useEffect(() => {
//     getAllProduct();
//   }, []);
//   return (
//     // <div>Product</div>
//     <>
//       <Layout>
//         <div className="row">
//           <div className="col md-3">
//             <AdminMenu />
//           </div>
//           <div className="col md-9">
//             <h1 className="text-center">All Product List</h1>

//             <div className="d-flex flex-row">
//               {products?.map((p) => (
//                 <Link key={p._id} to={`/dashboard/admin/poduct/${p.slug}`}>
//                   {/* <h1>hello</h1> */}
//                 <div className="card m-2" style={{ width: "18rem" }}>
//                   {/* <h1>hello</h1> */}
//                   <img src="p.photo" className="card-img-top" alt={p.name} />
//                   <div className="card-body ">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">{p.description}</p>
//                     {/* <a href="#" className="btn btn-primary">
//                     Go somewhe
//                   </a> */}
//                   </div>
//                 </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default Products;
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import '../../styles/dashbrd.css'
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      // const { data } = await axios.get("/api/v1/product/get-product");
      const { data } = await axios.get(
                `/api/v1/product/get-product`
              );
      // const { data } = await axios.get(
      //           `${process.env.REACT_APP_API}/api/v1/product/get-product`
      //         );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row dashbrd">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Products;