import { v2 as cd } from "cloudinary";
import env from "dotenv";
env.config();
const ccon = cd.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export function imagesFromCloud(maxResult) {
  return new Promise(function (resolve, reject){
    cd.api.resources(
      { 
        type: "upload", 
        cloud_name: process.env.CLOUD_NAME,
        max_results: maxResult, 
        resource_type: "image"
      },
      function (error, result){
        if (error) {
          console.error("Error fetching images from Cloudinary:", error);
          reject(error);
          return;
        } 
        
        const images = result.resources.map(img => ({
          public_id: img.public_id,
          // Extracting the public_id by removing the prefix
          url: img.secure_url,
          format: img.format,
          width: img.width,
          height: img.height,
          created_at: img.created_at
        }));
        resolve(images);
      }
    );
  });
}



// module.exports= {imagesFromCloud};
// async function fetchImagesFromFolder(folderName){
//     try{
//         const result = await cd.api.resources({
//             type:"upload",
//             prefix: `${folderName}`,
//             resource_type:"image",
//             max_results:10
//         });
//     return result.resources.map(img=>({
//         public_id:img.public_id,
//         url: img.secure_url,
//         format:img.format,
//         width: img.width,
//         height:img.height,
//         created_at: img.created_at
//     }));} catch(error){
//         console.error("error",error);
//         return [];
//     }
// }
// const arr = await fetchImagesFromFolder("productsAdded")
// console.log(arr);
