var mongoose = require  ('mongoose');

var modelSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"El nombre es obligatorio"], 
        minlength: [4,"El nombre es demasiado corto"],
        maxlength: [12, "El nombre es demasiado largo"]
    },
    email: {
        type: String,
        required: [true,"El email es obligatorio"]
    },
    type:{
        type: String,
        enum: ["Alumno", "Maestro"]
    }
});

var Zombie = mongoose.model("Zombie",modelSchema);
module.exports = Zombie;