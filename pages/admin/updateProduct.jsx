import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../src/utils/mediaUpload";

export default function UpdateProductPage(){
 const location=useLocation()
        const [productId,setProductId] =useState(location.state.productId);
         const [productName,setProductName] =useState(location.state.name);
          const [alternativeNames,setAlternativeNames] =useState(location.state.altNames.join(","));
           const [labelledPrice,setLabelledPrice] =useState(location.state.labelledPrice);
            const [price,setPrice] =useState(location.state.price);
             const [images,setImages] =useState([]);
                 const [description,setDescription] =useState(location.state.description);
                  const [stock,setStock] =useState(location.state.stock);
                   const [isAvailable,setIsAvailable] =useState(location.state.isAvailable);
                    const [category,setCategory] =useState(location.state.category);
                    const Navigate=useNavigate()
                   
                     console.log(location.state);


                async function handleSubmit(){

                       const promiseArray=[]

                        for(let i=0;i<images.length;i++){

                              
                                
                                const promise=uploadFile(images[i])
                              //  console.log(images[i]);
                              promiseArray[i]=promise
                        }

                          const responses=await Promise.all(promiseArray)
                                console.log(responses)
                       
    const  altNamesInArray = alternativeNames.split(",")
                    
        const productData={
                productId:productId,
                name:productName,
                altNames:altNamesInArray,
                labelledPrice:labelledPrice,
                price:price,
                images:responses,
                description:description,
                stock:stock,
                isAvailable:isAvailable,
                category:category

        }

        if(responses.length==0){
                productData.images=location.state.images
        }
        const token=localStorage.getItem("token")
        if(token==null){
              //  window.location.href="/login";
              Navigate("/login");
                return;
        }

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId ,productData,{
                headers:{
Authorization:"Bearer "+ token
                }
        }).then(
                (res)=>{
                        console.log("Product added successfully")
                        console.log(res.data)
                        toast.success("Product added successfully");
                        Navigate("/admin/products")
                }
        ).catch(
                (error)=>{
                        console.error("Error adding product: ",error);
                        toast.error("Failed to add product")
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
                    <input
                    disabled
                     type= "text" value={productId} onChange={(e)=>{setProductId(e.target.value)}} className="w-full h-[40px] border-[1px] rounded-md"/>


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
                    <input multiple
                    type="file" 
                     onChange={(e)=>{
                       //console.log(e.target.files)
                        setImages(e.target.files)
                     }
                }
                         className="w-full h-[40px] border-[1px] rounded-md"/>
                     

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
                 <button onClick={handleSubmit}  className="w-[200px] h-[50px] bg-black text-white rounded-md flex justify-center items-center border-[2px] ml-[20px]">Update Product</button>


            </div>
           
            
        </div>
        </div>
                
    )
}
