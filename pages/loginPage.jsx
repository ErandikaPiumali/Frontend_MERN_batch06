import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){


    const[password, setPassword] = useState("");
    const[email, setEmail]=useState("");
    const navigate=useNavigate()

    function login(){

    console.log(email,password)
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {email:email,
         password:password
        }
    ).then(
        (response)=>{
            console.log(response.data)
        localStorage.setItem("token",response.data.token)
        //If need to read --> const token=localStorage.getItem("token")
          // alert("Login Successful") 
         toast.success("Login successful")

          if(response.data.role=="admin"){
            //go to admin page
         //   window.location.href =("/admin")
         navigate("/admin")
         
          }else if(response.data.role=="user"){
            //go  to user page
        //    window.location.href=("/")
        navigate("/")
          }
        }
        
    ).catch(
        (error)=>{
            console.log(error)
         //   alert("Login failed")
         toast.error("Login failed")

        })
    }


    return(
        <div className="w-full h-screen bg-[url(./loginImage.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="w-[500px] h-[500px] relative backdrop-blur-sm shadow-2xl rounded-[30px] text-white flex flex-col items-center justify-center gap-[20px]">
                <h1 className="text-2xl font-bold text-center my-5 absolute top-[20px]"> Login </h1>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Email</span>
                    <input  onChange={
                        (e)=>{
                            setEmail(e.target.value)
                            console.log("Email is changed")
                        }
                     } type="text" className="w-[350px] h-[40px] border border-white rounded-xl"/>
                </div>

                  <div className="w-[350px] flex flex-col">
                    <span className="text-lg">Password</span>
                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                            console.log("password is changed")
                        }
                    } type="password" className="w-[350px] h-[40px] border border-white rounded-xl"/>
                </div>

                <button onClick={login} className="w-[350px] h-[40px] bg-blue-500 rounded-xl text-white text-lg mt-5 hover:bg-blue-600 transition-all duration-300">
                    Login
                </button>

                <p>Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link> from here</p>

            </div>
           

            </div>
           
           
       
    )
}
