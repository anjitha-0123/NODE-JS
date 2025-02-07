import multer from "multer"; 
import path from "path";
import fs from 'fs';


const uploadDir = "uploads/"; //uploads is a folder
if (!fs.existsSync(uploadDir)) { //fs is directory related package
    fs.mkdirSync(uploadDir, { recursive: true }); //flag to create parent directory
}

// Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb is a callbackfunction
        cb(null, "uploads/"); // Save images inside the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// File filter for image uploads
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
//     }
// };

// Initialize Multer
const upload = multer({ storage: storage });

//const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;