const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    description : {
        type : String,
        required : true

    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }

})

const ToDo = mongoose.model('ToDo',todoSchema);
module.exports = ToDo;