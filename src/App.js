import { useEffect, useState } from 'react';
import axios from 'axios';
import  HomePage from "./Pages/HomePage";
import Shoeitem from "./Pages/Shoeitem";
import Shoe from "./Pages/Shoe";
import {Routes, Route, Link} from "react-router-dom";
import React from 'react'

function App() {
const [data,setData] = useState([]); 
const shoes = async function () {
try {
  const res = await axios.get("https://6374b4b508104a9c5f869829.mockapi.io/money/my-store")
  console.log(res.data)
  setData(res.data)
} catch (error) {
  console.log(error); 
}}

useEffect(() => {
  shoes()
}, [])

  return (
    <div>
       <header>
        <ul>
          <li><Link to="/">HomePage</Link></li>
          <li><Link to="/shoes">Shoes</Link></li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoes" element={data.map(shoe =>{
          return <Link to={`/shoes/${shoe.id}`}><Shoeitem key={shoe.id} id={shoe.id} shoe={shoe}/></Link>}
          )}/>
          <Route path="/shoes/:id" element={<Shoe/>}/>
      </Routes>
    </div>
  );
}

export default App;
