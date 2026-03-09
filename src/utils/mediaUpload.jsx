const url= "https://bzdstqbxbpbuvzfdfyrj.supabase.co"

const key="sb_publishable_Adj-hU3Acmv_jxvgSeMLug_iAOLnSVq"


import { createClient } from "@supabase/supabase-js"
const supabase =createClient(url,key);

export default function uploadFile(file){

    const promise=new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("Please select a file to upload");
                return;
            }
            const timeStamp =new Date().getTime();
            const fileName = timeStamp +"-"+ file.name

            supabase.storage.from("Images").upload(fileName,file,{
cacheControl:"3600",
upsert:false
            }).then(
                ()=>{

           const publicUrl =  supabase.storage.from("Images").getPublicUrl(fileName).data.publicUrl;
            //console.log("file public url: ",publicUrl)
            resolve(publicUrl)
        }
    ).catch(
        (error)=>{
            console.error("Error uploading file: "+error);
            reject("Failed to uplaod file");
        }
    )
}
)

    return promise;
}