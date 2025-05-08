import multer, { memoryStorage } from "multer";
const storage = multer.memoryStorage();
export const fileUploadMiddleware = multer({ storage }).single("file");
