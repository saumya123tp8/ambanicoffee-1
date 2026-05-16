import React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css'
import toast from 'react-hot-toast';
import axios from 'axios'

const ForgotPassword = () => {

    const[email,setEmail]=useState('')
    const[newPassword,setNewPassword]=useState('')
    const[answer,setAnswer]=useState('')
      const navigate=useNavigate();
      ///form function
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const res=await axios.post(`/api/v1/auth/forgot-password`,{email,newPassword,answer});
          // const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer});
          if(res&&res.data.success){
            toast.success('login successfully',{ duration: 1000 })
            navigate('/login');
          }else{
            toast.error(res.data.message)
          }
        }catch(error){
            // console.log(password);
            console.log(email);
            console.log(answer);
            console.log(newPassword);
           console.log('error is in reset ')
          console.log(error);
          toast.error('something went wrong in reset',{ duration: 2500 })
        }
      }
      

    return(
    <Layout title={'forgot password'}>
    <div className='form-container'>
       <form onSubmit={handleSubmit}>
       <h1>Reset Password</h1>
 <div className="mb-3">
   <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" placeholder='Enter your email here' required/>
 </div>
 <div className="mb-3">
   <input type="text" onChange={(e)=>setAnswer(e.target.value)} value={answer} className="form-control" id="exampleInputAnswer1" placeholder='what is your bestfriend name' required/>
 </div>
 <div className="mb-3">
   <input type="password" onChange={(e)=>setNewPassword(e.target.value)} 
   value={newPassword} className="form-control" id="exampleInputPassword1" placeholder='enter your new password here' required/>
 </div>
 <button type="submit" className="btn btn-primary">Reset</button> 
</form>

    </div>
   </Layout>
 )
}

export default ForgotPassword