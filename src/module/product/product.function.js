export const copyObject = (object) =>{
      return  JSON.parse(JSON.stringify(object));
}


export const imagesReqBody = (files , filepath)=>{
  
    if(files.length >0){
    
          return ((files.map(file => path.join(filepath, file.filename )))
         .map(item=>item.replace(/\\/g, '/')))
    }
    return []
 
 }
 export const setFeatures = (productData)=>{
    let features = {}
    features.color = productData.color
    if(!isNaN(productData.width)) features.width = productData.width
    if(!isNaN(productData.weight)) features.weight = productData.weight
    if(!isNaN(productData.length)) features.length = productData.length
    if(!isNaN(productData.height)) features.height = productData.height
    return features

 }