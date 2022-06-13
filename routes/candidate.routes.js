const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

var multer = require('multer');
var fs = require('fs');

var uploads = multer({ storage: storage });
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});



let routes = (app) => {
    router.post("/uploadfile", uploads.single("uploadfile"), candidateController.importExcelData2MongoDB);
    app.use("", router);
};
module.exports = routes;