import React,{useState,useEffect} from 'react'
import { useNavigate ,useLocation} from 'react-router-dom';
const Spinner = ({path="login"}) => {
    const [count,setCount]=useState(3)
    const navigate=useNavigate()
    const location=useLocation()
    console.log("path: "+path);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((preValue)=>
                --preValue)
        },1000)
        count===0&&navigate(`/${path}`,{
          state:location.pathname,
        })
        return ()=>clearInterval(interval)
    },[count,navigate,location])
  return (
    <>
    <div className="spin text-center">
    <h1>redirecting you in {count} second</h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    </>
  );

};
export default Spinner