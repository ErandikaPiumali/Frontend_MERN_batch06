import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link,  useNavigate } from "react-router-dom";
import Loader from "../../src/components/loader";



//Following are sample data set to test frontend without running backend.
/*const sampleProducts=[
    
  {
    "productId": "P001",
    "name": "Vitamin C Face Serum",
    "altNames": ["Face Brightening Serum", "Glow Serum"],
    "labelledPrice": 4500,
    "price": 3800,
    "images": ["/images/vitamin-c-serum.jpg"],
    "description": "A lightweight serum that brightens skin and reduces dark spots.",
    "stock": 50,
    "isAvailable": true,
    "category": "cosmetics"
  },
  {
    "productId": "P002",
    "name": "Aloe Vera Moisturizing Gel",
    "altNames": ["Aloe Gel", "Skin Hydration Gel"],
    "labelledPrice": 2000,
    "price": 1600,
    "images": ["/images/aloe-vera-gel.jpg"],
    "description": "Natural aloe vera gel that hydrates and soothes irritated skin.",
    "stock": 75,
    "isAvailable": true,
    "category": "cosmetics"
  },
  {
    "productId": "P003",
    "name": "Matte Finish Foundation",
    "altNames": ["Liquid Foundation", "Makeup Base"],
    "labelledPrice": 5200,
    "price": 4700,
    "images": ["/images/matte-foundation.jpg"],
    "description": "Long-lasting matte foundation suitable for all skin types.",
    "stock": 40,
    "isAvailable": true,
    "category": "cosmetics"
  },
  {
    "productId": "P004",
    "name": "Herbal Face Wash",
    "altNames": ["Neem Face Wash", "Natural Cleanser"],
    "labelledPrice": 1500,
    "price": 1200,
    "images": ["/images/herbal-facewash.jpg"],
    "description": "Gentle herbal cleanser that removes dirt and excess oil.",
    "stock": 60,
    "isAvailable": true,
    "category": "cosmetics"
  },
  {
    "productId": "P005",
    "name": "SPF 50 Sunscreen Cream",
    "altNames": ["Sun Protection Cream", "UV Block Cream"],
    "labelledPrice": 3000,
    "price": 2500,
    "images": ["/images/spf50-sunscreen.jpg"],
    "description": "High protection sunscreen that shields skin from harmful UV rays.",
    "stock": 35,
    "isAvailable": true,
    "category": "cosmetics"
  }
];*/



export default function ProductAdminPage(){

  const[products,setProducts] =useState([])
  const [isLoading,setIsloading] =useState(true)
  //const[a,setA]=useState(0);
 

  useEffect(
    ()=>{
      if(isLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL +"/api/products").then(
        (res)=>{
          setProducts(res.data)
          setIsloading(false);
        }
      )
    }
    },[isLoading]
  )
  const navigate = useNavigate()
    
    return(
    <div className="w-full h-full border-[3px]">
        
           {isLoading?<Loader/>: <table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Images</th>
                        <th className="p-[10px]">Product Id</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Price</th>
                         <th className="p-[10px]">labelledPrice</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Action</th>

                    </tr>
                     </thead>
                     <tbody>
                        {

            products.map(
                (product,index)=>{

                   // console.log(product)
                  //  return product.name
//console.log(index)
                  return(

                   <tr key={index}>
                    <td>
                        <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]"/>
                    </td>
                    <td className="p-[10px]">{product.productId}</td>
                      <td className="p-[10px]">{product.name}</td>
                    <td className="p-[10px]">{product.price}</td>
                     <td className="p-[10px]">{product.labelledPrice}</td>
                       <td className="p-[10px]">{product.category}</td>
                        <td className="p-[10px]">{product.stock}</td>
                      <td className="p-[10px] flex flex-row items-center justify-center" > 
                         <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
                      onClick={
                        ()=>{
                          const token=localStorage.getItem("token");
                          if (token == null){
                            navigate("/login");
                            return;
                          }
                          axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product.productId,
                            {
                              headers:{
                                Authorization:`Bearer ${token}`
                              }
                            }
                          ).then(
                            (res)=>{
                              console.log("Product deleted successfully");
                              console.log(res.data);
                              toast.success("Product deleted successfully");
                            //  setA(a+1);
                            setIsloading(!isLoading);
                            }
                          ).catch(
                            (error)=>{
                              console.error("Error deleting product: ",error)
                              toast.error("Failed to delete product")
                            }
                          )

                        }
                      }/>
                      <BiEdit onClick={
                        ()=>{
                          navigate("/admin/updateProduct",
                            {
                              state:product
                            }

                          );
                        }
                      }
                      className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]" />
                      </td>
                  </tr>
                
            )
        }
      )
        }
         </tbody>
            </table>}
        <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] text-white bg-black p-[20px] rounded-full shadow-2xl">
            <BiPlus className="text-3xl"/>

        </Link>
      
    </div>
    )
}