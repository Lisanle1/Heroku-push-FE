import React,{useState} from 'react'
import axios from 'axios'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { API_URL } from './API_URL';

function Login() {
let navigate=useNavigate(); 
let [formData,setFormData]=useState({
  email:"",
  password:""
});
let handleSubmit=async(e)=>{
e.preventDefault();
const res=await axios.post(`${API_URL}/register/signin`,{...formData});
if(res){
  localStorage.setItem("token",res.data)
  navigate('/products')
}
}
  return (
    <div style={{textAlign:"center",marginTop:"5rem"}}>
        <Typography variant="h4">Signin yourself!!!</Typography>
        <br/>
        <form onSubmit={handleSubmit}>
        <div>
        <TextField 
        id="email"
        type="email" 
        label="Email" 
        name="email"
        variant="standard"
        value={formData.email}
        onChange={(e)=>setFormData({...formData,email:e.target.value})} 
        /><br/>
        <br/>
        <TextField 
        id="password"
        type="password" 
        label="Password" 
        name="password"
        variant="standard"
        value={formData.password}
        onChange={(e)=>setFormData({...formData,password:e.target.value})}
        /><br/>
        <br/>
        <Button variant="contained" type="submit">Sign in</Button>
        </div>
        </form>
    </div>
  )
}

export default Login