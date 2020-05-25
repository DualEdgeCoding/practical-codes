const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, `./public/uploads/${req.user.id}/`),
    filename: (req, file, callback) => callback(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        if(filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase())) {
            callback(null, true);
        } else {
            callback({message: "images only."});
        }
    }
}).single("posterUpload");

module.exports = upload;