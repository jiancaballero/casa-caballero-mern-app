
import './App.css';
import { Route, Routes } from "react-router";
import Home from './pages/home/Home'
import RoomList from './pages/room/RoomList';
import 'antd/dist/antd.min.css';
function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/search' element={<RoomList/>}/>
   </Routes>
   </>
   
  );
}

export default App;
