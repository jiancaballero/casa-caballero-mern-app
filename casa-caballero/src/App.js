
import './App.css';
import { Route, Routes } from "react-router";
import Home from './pages/home/Home'

import 'antd/dist/antd.min.css';
import Booking from './pages/booking/Booking';
import GuestDetails from './pages/booking/GuestDetails';
import Payment from './pages/booking/Payment';
import SuccessPayment from './pages/payment/SuccesPayment';
import ManageBooking from './pages/booking/ManageBooking';

function App() {
 
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/booking/room-selection' element={<Booking/>}/>
    <Route path='/booking/guest-details' element={<GuestDetails/>}/>
    <Route path='/booking/payment' element={<Payment/>}/>
    <Route path='/payment/success' element={<SuccessPayment/>}/>
    <Route path='/manage-bookings' element={<ManageBooking/>}/>
   </Routes>
   </>
   
  );
}

export default App;
