import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {  useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { API_URL } from './API_URL';
function ProductComponent () {
  let navigate = useNavigate();
  let [ products, setProducts ] = useState( [] );
  useEffect( () =>{
    async function getProducts (){
      const decodedToken = jwt.decode( localStorage.getItem( "token" ) );
      if ( decodedToken.exp * 1000 < Date.now()){
        navigate('/');
      }
      else{
        const res = await axios.get( `${API_URL}/products/get`, {
          headers: {
            accesstoken: localStorage.getItem( "token" )
          }
        });
        setProducts(res.data)
      }
    }
    getProducts();
  },[]);
  let updateProduct=async(id,value)=>{
    const decodedToken = jwt.decode( localStorage.getItem( "token" ) );
    if ( decodedToken.exp * 1000 < Date.now()){
      navigate('/');
    }
    else{
    const res=await axios.put(`${API_URL}/products/update/${id}`,
    {
      products:{
      userQuantity:value
        }
    },{
      headers:{
        accesstoken:localStorage.getItem("token")
      }
    });
    
    let productsCopy=[...products]
    let index=products.findIndex((row)=> row._id === id);
    products[index].userQuantity =res.data.value.userQuantity
    setProducts(productsCopy)
  }
}
let handleLogout=()=>{
  localStorage.removeItem("token");
  navigate("/")
}
  return (
    <Grid>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Guvi - Products
            </Typography>
          <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2} style={{padding:"20px"}}>
        {
          products.map((row)=>{
            return (
            <Grid item key={row._id}>
               <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {row.productName}
          </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Quantity: {row.quantity}
        </Typography>
        <Typography variant="body2">
            {row.description}
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong>Price: {row.price}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>updateProduct(row._id,--row.userQuantity)} disabled={row.userQuantity<=0}>-</Button>
        {row.userQuantity}
        <Button size="small" onClick={()=>updateProduct(row._id, ++row.userQuantity)} disabled={row.userQuantity>=row.quantity}>+</Button>
      </CardActions>
    </Card>
            </Grid>
            )  
        })
        }
      </Grid>
    </Grid>
  )
}

export default ProductComponent;    