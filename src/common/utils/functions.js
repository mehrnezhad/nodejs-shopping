import path from "path"
import fs from "fs"

export const deleteFile = (filename) => {

   if (filename) {
      const filepath = path.join(process.cwd(), "public", filename)
      fs.unlinkSync(filepath)
   } else {
      return null
   }

}

export const deleteInvalidPropertyInObject = (obj = {}, blackListFields = []) => {

   const nulishList = ["", " ", 0, "0", undefined, null]
   Object.keys(obj).forEach(key => {
      if (nulishList.includes(obj[key])) delete obj[key]
      if (blackListFields.includes(key)) delete obj[key]
      if (typeof obj[key] == 'string') obj[key] = obj[key].trim()
      if (Array.isArray(obj[key]) && obj[key].length == 0) delete obj[key]
      if (Array.isArray(obj[key]) && obj[key].length > 0) obj[key] = obj[key].map(item => item.trim())
   })


}
export const getTime = (time) => {
   let total = Math.round(time) / 60;
   let [min, percentage] = String(total).split(".");
   if (percentage == undefined) percentage = "0"
   let sec = Math.round(((percentage.substring(0, 2)) * 60) / 100);
   let hour = 0;
   if (min > 59) {
      total = min / 60;
      [hour, percentage] = String(total).split(".")
      if (percentage == undefined) percentage = "0"
      min = Math.round(((percentage.substring(0, 2)) * 60) / 100);
   }
   if (hour < 10) hour = `0${hour}`;
   if (min < 10) min = `0${min}`
   if (sec < 10) sec = `0${sec}`
   return hour + ":" + min + ":" + sec;
}

export const getTimeOfCourse = (chapter = []) => {
   let time, hour, minute, second = 0
   for (const episodes of chapter) {
      if (Array.isArray(episodes.episodes)) {

         for (const episode of episodes.episodes) {
            
            if (episode?.time) time = episode.time.split(":")
            else time = "00:00:00".split(":")
            if (time.length == 3) {
               second += Number(time[0]) * 3600
               second += Number(time[1]) * 60
               second += Number(time[2])
            }
            else if (time.length == 2) {
               second += Number(time[0]) * 60
               second += Number(time[1])
            }
         }
      }
   }
   
   
   hour = Math.floor(second / 3600)
   minute = Math.floor(second / 60) % 60
   second = Math.floor(second % 60)

   if (hour < 10) hour = `0${hour}`;
   if (minute < 10) minute = `0${minute}`
   if (second < 10) second = `0${second}`
   return hour + ":" + minute + ":" + second;
}


export const copyObject = (obj) => {
   return JSON.parse(JSON.stringify(obj))
}
