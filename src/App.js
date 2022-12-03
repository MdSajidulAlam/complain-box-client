import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import About from './Pages/About/About';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users';
import ManageAuthority from './Pages/Dashboard/ManageAuthority';
import MyProfile from './Pages/Dashboard/MyProfile';
import RequireAuth from './Pages/Authentication/RequireAuth';
import MyComplains from './Pages/Dashboard/MyComplains';
import AllComplain from './Pages/Dashboard/AllComplain';
import ComplainDetails from './Pages/Navbar/ComplainDetails';

function App() {
  return (
    <div className='font-[montserrat]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/complaindetails/:id' element={<ComplainDetails />}></Route>
        <Route path='/manageauthority/:id' element={<ManageAuthority />}></Route>
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route index element={<MyProfile />}></Route>
          <Route path='users' element={<Users />}></Route>
          <Route path='mycomplains' element={<MyComplains />}></Route>
          <Route path='allcomplain' element={<AllComplain />}></Route>
        </Route>

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
