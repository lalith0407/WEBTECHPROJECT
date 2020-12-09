const {Schema,model} = require('mongoose')

let ToDoSchema = new Schema({
    description:{type:String,required:true}
});
module.exports=model('ToDo',ToDoSchema);