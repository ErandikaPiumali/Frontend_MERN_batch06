import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProductPage(){

        const [productId,setProductId] =useState("");
         const [productName,setProductName] =useState("");
          const [alternativeNames,setAlternativeNames] =useState("");
           const [labelledPrice,setLabelledPrice] =useState("");
            const [price,setPrice] =useState("");
             const [images,setImages] =useState("");
                 const [description,setDescription] =useState("");
                  const [stock,setStock] =useState("");
                   const [isAvailable,setIsAvailable] =useState(true);
                    const [category,setCategory] =useState("cream");
                   
function handleSubmit(){
        const productData={
                productId:productId,
                name:productName,
                altNames:alternativeNames,
                labelledPrice:labelledPrice,
                price:price,
                images:images,
                description:description,
                stock:stock,
                isAvailable:isAvailable,
                category:category

        }
        const token=localStorage.getItem("token")
        if(token==null){
                window.location.href="/login";
                return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products",productData,{
                headers:{
Authorization:"Bearer "+ token
                }
        }).then(
                (res)=>{
                        console.log("Product added successfully")
                        console.log(res.data)
                }
        ).catch(
                (error)=>{
                        console.error("Error adding product: ",error);
                }
        )
        console.log(productData);
}


    return(
        <div className="w-full h-full flex justify-center items-center">
       {/*to make the form*/}
            <div className="w-[600px]  border-[3px] rounded-[15px] flex flex-wrap justify-between p-[40px]">
                <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Product Id</label>
                    <input type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[300px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Product Name</label>
                    <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Alternative Names</label>
                    <input type="text" value={alternativeNames} onChange={(e)=>{setAlternativeNames(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Labeled Price</label>
                    <input type="number" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Price</label>
                    <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Images</label>
                    <input type="text" value={images} onChange={(e)=>{setImages(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[500px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Description</label>
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-full h-[100px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Stock</label>
                    <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


            </div>
            <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Is Available</label>
                   <select value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value==="true")}} className="w-full border-[1px] h-[40px] rounded-md">
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                   </select>

            </div>
             <div className="w-[200px] flex flex-col gap-[5px]">
                    <label className="text-sm font-semibold">Category</label>
                   <select  value={category} onChange={(e)=>{setCategory(e.target.value)}} className="w-full border-[1px] h-[40px] rounded-md">
                    <option value="Cream">Cream</option>
                    <option value="Face wash">Face wash</option>
                     <option value="Soap">Soap</option>
                       <option value="Fragrance">Fragrance</option>
                     
                     

                   </select>

            </div>
            <div className=" w-full flex justify-center flex-row py-[20px]">
                <Link to ={"/admin/products"} className="w-[200px] h-[50px] bg-white text-black rounded-md flex justify-center items-center border-[2px]">Cancel</Link>
                 <button onClick={handleSubmit}  className="w-[200px] h-[50px] bg-black text-white rounded-md flex justify-center items-center border-[2px] ml-[20px]">Add Product</button>


            </div>
           
            
        </div>
        </div>
    )
}