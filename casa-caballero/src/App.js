
import './App.css';
import { Route, Routes } from "react-router";
import Home from './pages/home/Home'

import 'antd/dist/antd.min.css';
import Booking from './pages/booking/Booking';

function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/search' element={<Booking/>}/>
   </Routes>
   </>
   
  );
}

export default App;
