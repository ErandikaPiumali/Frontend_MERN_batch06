
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/homePage'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import './App.css'
import AdminPage from '../pages/adminPages'


function App() {


  return (
        <BrowserRouter>

     <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[calc(100vw-35px)] h-[calc(100vh-15px)] border border-red-700">
           <Routes path="/">
          <Route path="/" element={<HomePage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin/*" element={<AdminPage/>}/>
          </Routes>
         
        </div>
        </div>
     
    </BrowserRouter>

  );
}

export default App
