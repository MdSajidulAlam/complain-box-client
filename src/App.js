import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './Pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ComplainForm from './Pages/ComplainForm/ComplainForm';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/' element={<ComplainForm />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
