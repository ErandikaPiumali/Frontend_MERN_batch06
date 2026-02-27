
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/homePage.jsx'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import './App.css'
import AdminPage from '../pages/adminPages'
import TestPage from '../pages/testPage'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
        <BrowserRouter>

     <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[calc(100vw-35px)] h-[calc(100vh-15px)] border border-red-700">

          <Toaster position="top-right"/>
           <Routes path="/">
          <Route path="/" element={<HomePage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/admin/*" element={<AdminPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
          </Routes>
         
        </div>
        </div>
     
    </BrowserRouter>

  );
}

export default App
