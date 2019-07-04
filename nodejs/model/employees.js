var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employees = new Schema({
    emp_code: String,
    manager_code: String,
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: String,
   

    

});
module.exports = mongoose.model('employees', employees);
