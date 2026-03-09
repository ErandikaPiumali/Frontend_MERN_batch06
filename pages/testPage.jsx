


import { useState } from "react"

import toast from "react-hot-toast"
import uploadFile from "../src/utils/mediaUpload"



export default function TestPage(){
    const [file,setFile]=useState("null") 

   function handleUpload(){
    uploadFile(file)
  .then(
        (url)=>{
           
            console.log(url)
             toast.success("File uploaded successfully");
           
        }
    ).catch(
        (error)=>{
            console.error("Error uploading file:", error)
            toast.error("Failed to upload file")
        }
    )
}
    return(
        <div className="w-full h-screen  flex justify-center items-center">
           <input type="file" 
           onChange={(e)=>{
           // console.log(e)
           // console.Console(e.target.files[0])
setFile(e.target.files[0]);

           }}/> 
           <button onClick={handleUpload}
           className="bg-blue-500 rounded-md py-2 px-4 text-white cursor-pointer">
Upload
           </button>
            
            
        </div>
    )
}