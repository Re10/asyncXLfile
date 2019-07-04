//include express,router,news,comments files
var express = require('express');
var router = express.Router();
var manager = require('./controller/employee');
var employees = require('./controller/employee');
//==use Multer For image upload==//
var multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        console.log("file original name:", file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');




// router.get('/emp/', emp.getAllEmp);
// router.put('/emp/:id', upload, emp.update);

router.post('/emp/', upload, employees.create);
// router.post('/mgr/', manager.CreateManager);
router.post('/upload/', employees.CreateEmp);
//router.post('/download/', upload, employees.download);
//router.delete('/emp/:id', emp.delete);

// router.post('/regi/', regi.create);
// router.post('/regies/:id', regi.getAll);

module.exports = router;