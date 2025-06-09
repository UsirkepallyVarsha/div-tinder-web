import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests ,removeRequest} from '../utils/requestSlice';
import { useEffect } from 'react';

const Requests = () => {
  const requests =useSelector((store)=>store.requests);
  const dispatch=useDispatch();
  const reivewRequets=async(status,requestid)=>{
    try{
await axios.post(" http://localhost:3000/requests/review/"+status+"/"+requestid,{},{ withCredentials: true});
dispatch(removeRequest(requestid));
    }
    catch(err){
      console.error(err.message);
     
    }
  }
  const fetchRequests=async()=>{
    try{
const res=await axios.get("http://localhost:3000/users/requests/received",{ withCredentials: true})
dispatch(addRequests(res.data.data))
    }
    catch(err){
      console.error(err.message);
    }
  }
  useEffect(()=>{
fetchRequests();
  },[])
 
     if(!requests)return;
     if(requests.length===0){
       return <h1>No Requests Found</h1>
     }
   return (
     <div className='flex flex-col justify-center my-10'>
    <h1 className='text-bold text-3xl'>Requests</h1>
 {requests.map((request)=>{
   const{_id,firstName,lastName,photo,age,gender,about}=request.fromUserId;
   return(
   <div key={_id} className=' flex m-8 p-9 rounded-lg bg-base-200 w-1/2 '><div><img alt="photo" className='m-50 rounded-lg h-40' src={photo}/></div>
   <div className='mx-2'><h1>{firstName+" "+lastName}</h1>
    <h1>{age+" "+gender}</h1>
   <p>{about}</p>
  <button className="btn btn-primary my-9 mx-2"onClick={()=>reivewRequets("accepted",request._id)}>Accept</button>
<button className="btn btn-secondary mx-2"onClick={()=>reivewRequets("rejected",request._id)}>Reject</button>
   </div></div>
 )
 })}
     </div>
   )
}

export default Requests;
