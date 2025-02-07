import multer from "multer";

// Use memory storage to store file as buffer
const storage = multer.memoryStorage();

const upload1 = multer({ storage: storage });

export {upload1} 