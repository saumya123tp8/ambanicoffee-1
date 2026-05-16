import React from 'react'
import { useAuth } from '../../context/auth';
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/AuthStyles.css'
import toast from 'react-hot-toast';
import axios from 'axios'
const Login = () => {
  
  const[email,setEmail]=useState('')
  const [auth,setAuth]=useAuth();
  const[password,setPassword]=useState('')
    const navigate=useNavigate();
    const location=useLocation();
    ///form function
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res=await axios.post(`/api/v1/auth/login`,{email,password});
        // const res=await axios.post(`http://localhost:8081/api/v1/auth/login`,{email,password});
        // console.log("request hit on " `localhost:8081/api/v1/auth/login`);
        // console.log("res :",res.data);
        
        // console.log("res_dt :", res.data.userDto);
        // const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        if(res&&res.data.success){
        // if(res&&res.data.accessToken){
          toast.success(res.data&&res.data.message);
          toast.success('login successfully',{ duration: 1000 })
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          // setAuth({
          //   ...auth,
          //   user:res.data.userDto,
          //   token:res.data.accessToken
          // })
          localStorage.setItem('auth',JSON.stringify(res.data))
          navigate(location.state||'/');
        }else{
          toast.error("error message ",res.data.message)
        }
      }catch(error){
        console.log(error);
        toast.error('something went wrong',{ duration: 2500 })
      }
    }
    
    
    return (
    <Layout title={'Login'}>
     <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
  <div className="mb-3">
    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" placeholder='Enter your email here' required/>
  </div>
  <div className="mb-3">
    <input type="password" onChange={(e)=>setPassword(e.target.value)} 
    value={password} className="form-control" id="exampleInputPassword1" placeholder='enter your password here' required/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button> 
  <div className='forgot mt-3'>
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot password</button> 
  </div>
</form>

     </div>
    </Layout>
  )
}

export default Login