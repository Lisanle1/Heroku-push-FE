import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Login';
import ProductComponent from './ProductComponent'
function RouterComponent() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/products' element={<ProductComponent/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default RouterComponent