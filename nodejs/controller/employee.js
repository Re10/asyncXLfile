var empModel = require('../model/employees');
//var managerModel = require('../model/manager');
const XLSX = require('xlsx');
var fs = require("fs");
var path = require("path");
var async = require("async");
const readXlsxFile = require('read-excel-file/node');

var employee = {
    create: function (req, res) {

        console.log('Request File:', req.file.path);
        const workbook = XLSX.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        res.status(200).json({ status: 'success', message: 'Document added Successfully.', doc: XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]), doc1: XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]) });

    },


    // CreateEmp: function (req, res) {
    //     var dataarr = [];
    //     var dataarr1 = [];
    //     console.log("Within create function of EMP");
    //     // var managerforSave=new managerModel();
    //     for (let i = 0; i < req.body[1].length; i++) {
    //         var manager = {
    //             emp_code: req.body[1][i].emp_code,
    //             fname: req.body[1][i].fname,
    //             lname: req.body[1][i].lname,
    //             email: req.body[1][i].email,
    //             status: req.body[1][i].status

    //         };
    //         var managerArray = []
    //         managerArray.push(manager);
    //         //console.log("MANGER==>",managerArray);
    //         async.each(managerArray, function (singlerecord, callback) {
    //             var managerforSave = new empModel({
    //                 emp_code: singlerecord.emp_code,
    //                 fname: singlerecord.fname,
    //                 lname: singlerecord.lname,
    //                 email: singlerecord.email,
    //                 status: singlerecord.status

    //             });

    //             console.log("Managersssss--", managerforSave);
    //             managerforSave.save(singlerecord, function (err, doc) {
    //                 if (err) {
    //                     console.log("Database error ", err);
    //                 }
    //                 if (!doc) {
    //                     console.log("Doc not found");
    //                 }
    //                 else {
    //                     //console.log("DOCUMENT DATTATATTATTATTATA-----", doc);  
    //                     dataarr.push(doc);
    //                     console.log("DATA ARRR:", dataarr);
    //                     if (req.body[1].length === dataarr.length) {
    //                         console.log("within if condition");
    //                         console.log("EMPLOYEEE DATAA:", dataarr.length)
    //                         for (let k = 0; k < dataarr.length; k++) {
    //                             for (let j = 0; j < req.body[0].length; j++) {
    //                                 if (dataarr[k].emp_code === req.body[0][j].manager_code) {
    //                                     console.log("Doc same IDDDDDD:", dataarr[k].emp_code);
    //                                     //  console.log("DB mangercoe",doc[j].manager_code);
    //                                     //   console.log("Xl  same IDDDDDD:", req.body[0][j].manager_code);
    //                                     req.body[0][j].manager_code = dataarr[k]._id;
    //                                     var emp = {
    //                                         emp_code: req.body[0][j].emp_code,
    //                                         manager_code: req.body[0][j].manager_code,
    //                                         fname: req.body[0][j].fname,
    //                                         lname: req.body[0][j].lname,
    //                                         email: req.body[0][j].email,
    //                                         status: req.body[0][j].status

    //                                     }
    //                                     console.log("IDDDDDDDDDDDDDD", req.body[0][j].manager_code);
    //                                     var empArray = [];
    //                                     empArray.push(emp);
    //                                     console.log("EMp DATA==:", empArray);
    //                                     async.each(empArray, function (empsinglerecord, callback) {
    //                                         console.log("In Async method Of Emp:");
    //                                         console.log(empsinglerecord);
    //                                         var empforSave = new empModel({
    //                                             emp_code: empsinglerecord.emp_code,
    //                                             manager_code: empsinglerecord.manager_code,
    //                                             fname: empsinglerecord.fname,
    //                                             lname: empsinglerecord.lname,
    //                                             email: empsinglerecord.email,
    //                                             status: empsinglerecord.status

    //                                         });
    //                                         console.log("Employeeessss--", empforSave);
    //                                         empforSave.save(empsinglerecord, function (err, document) {
    //                                             if (err) {
    //                                                 console.log("Database error ", err);
    //                                             }
    //                                             if (!document) {
    //                                                 console.log("Doc not found");
    //                                             }
    //                                             else {
    //                                                 //console.log("DOCUMENT DATTATATTATTATTATA-----", doc); 

    //                                                 dataarr1.push(document);

    //                                                 console.log("DATA ARRR:", dataarr1);
    //                                                 if (req.body[0].length === dataarr1.length) {
    //                                                     console.log("within if loop");
    //                                                     res.status(200).json({ doc: dataarr1, message: 'data inserted successfully' });
    //                                                 }

    //                                             }


    //                                         })
    //                                     })

    //                                 }
    //                             }
    //                         }


    //                     }
    //                 }

    //             })


    //         });
    //     }

    // },
    CreateEmp: function (req, res) {
        var empData = req.body[0];
        var managerData = req.body[1];
        console.log("Emp data:", empData);
        console.log("Manager Data:", managerData);
        Manager();
        async function Manager() {
            console.log("Within async function");
            for(let i=0;i<req.body[1].length;i++){
            var mangerSave = new empModel({
                emp_code: req.body[1][i].emp_code,
                fname: req.body[1][i].fname,
                lname: req.body[1][i].lname,
                email: req.body[1][i].email,
                status: req.body[1][i].status
            });
         
            console.log("===", mangerSave);
             var manawait = await mangerSave.save(managerData);
             
          //   console.log("mawait",manawait);
          async function Empl(){
            console.log("within empl function");
            async.each(manawait, function (mangerrecord, callback){
                async.each(empData, function (emprecord, callback){
                if(mangerrecord.emp_code === emprecord.manager_code){
                   console.log("manger record:",mangerrecord._id);
                   emprecord.manager_code=mangerrecord._id;
                    console.log("BODYYYYYYYYYYY:",emprecord.manager_code);
                    console.log("DataBse save functionality:",emprecord);
                    var employe=new empModel(emprecord);
                    employe.save(emprecord);
                    console.log("save file");
                    
                }
                })   
            })

        }
        Empl();
            
           
        }
        console.log("data to be pass in db:",empData);

        }
       
        
       
      

    }


}

module.exports = employee;