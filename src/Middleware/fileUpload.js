


import multer from "multer";
import path from "path";

const storageCongi = multer.diskStorage({
    destination:(req, file, cb)=>{
        // cb(null, path.resolve("public", "image"));
        cb(null, "public/image/");
    },
    filename:(req, file, cb)=>{
        // console.log(file)
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    }
})


export const fileUpload = multer({storage:storageCongi})
