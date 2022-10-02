
import './App.css';
import { Route, Routes } from "react-router";
import Home from './pages/home/Home'

import 'antd/dist/antd.min.css';
import Booking from './pages/booking/Booking';
import GuestDetails from './pages/booking/GuestDetails';

function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/booking/room-selection' element={<Booking/>}/>
    <Route path='/booking/guest-details' element={<GuestDetails/>}/>
   </Routes>
   </>
   
  );
}

export default App;
