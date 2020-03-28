var mongoose = require  ('mongoose');

var modelSchema = mongoose.Schema({
    description:{
        type: String,
        required: [true,"La descripcion es obligatoria"]
    },
    flavor:{
        type: String,
        required: [true,"El sabor es obligatorio"],
        enum: ["Fresa", "Limon"]
    },
    price:{
            type: String,
            required: [true,"El precio es obligatorio"]
    },
    picture:{
        type: String,
        required: [true,"La foto es obligatoria"]
    }
});

var Cerebro = mongoose.model("Cerebro",modelSchema);
module.exports = Cerebro;