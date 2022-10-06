
import './App.css';
import { Route, Routes } from "react-router";
import Home from './pages/home/Home'

import 'antd/dist/antd.min.css';
import Booking from './pages/booking/Booking';
import GuestDetails from './pages/booking/GuestDetails';
import Payment from './pages/booking/Payment';

function App() {
 
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/booking/room-selection' element={<Booking/>}/>
    <Route path='/booking/guest-details' element={<GuestDetails/>}/>
    <Route path='/booking/payment' element={<Payment/>}/>
   </Routes>
   </>
   
  );
}

export default App;
