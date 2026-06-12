import multer from 'multer';


export const upload = multer({
    storage: multer.diskStorage({})
})

// now we use this upload to upload any image on cloudinary storage 