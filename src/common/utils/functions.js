import path from "path"
import fs from "fs"

export const deleteFile = (filename) => {

   if (filename) {
      const filepath = path.join(process.cwd(), "public", filename)
      fs.unlinkSync(filepath)
   }else{
      return null
   }


}