let express = require('express');
let router = express.Router();


let Zombie = require('../models/zombie');
let Cerebro = require('../models/cerebro');

router.get('/zombies',async(req,res)=>{
    Zombie.find().exec((error,zombies)=>{
        if(!error){
            res.status(200).json(zombies);
        }
        else{
            res.status(500).json(error);
        }
    });
});

router.get('/cerebros',async(req,res)=>{
    Cerebro.find().exec((error,cerebros)=>{
        if(!error){
            res.status(200).json(cerebros);
        }
        else{
            res.status(500).json(error);
        }
    });
});


router.post('/zombies/new', async function(req,res){
    var data = req.body;
    
    var nuevoZombie = new Zombie({
      name: data.name,
      email: data.email,
      type: data.type
    })
   //{mensaje:"Se agrego un nuevo Zombie", estadoMensaje:"success"},
    nuevoZombie.save(function(error){
      var array = ["name","email","type"];
      //prueba
      if(error){
        detectorErrores(array);
        let mensaje = error.message;
        res.status(500).json({mensajeError: mensaje,MensajeExito:""});
      } else{
        res.status(200).json({mensajeError:'',mensajeExito:'Se agrego un nuevo zombie'});
      }
  
  
      function detectorErrores(errores){
        if(error){
          for (var i=0; i< errores.length; i++){
            aux = errores[i];
            console.log(aux);
            if(error.errors[aux]){
              console.log(error.errors[aux].message);
              res.status(500).json( {mensajeError: error.errors[aux].message})
            }
            else{
              console.log("No es error en" +aux);
            }
          }
        }
        else{
          res.status(200).json( {MensajeExito: "Se creó un nuevo zombie!"});
          return;
        }
      }
    
    });
  
  });

  //editar zombie
  router.put('/zombies/edit/:id', async (req,res) => {
    var editZombie = await zombie.findById(req.params.id);
    var data = req.body;
    editZombie.name = data.name;
    editZombie.email = data.email;
    editZombie.type = data.type;
    await editZombie.save(function(error){
      if(error){
        res.status(500).json({errors: error.message});
      }else{
        res.status(200).json({});
      }
    });
  });
   
  //eliminar zombie
  router.get('/zombies/delete/:id',async function(req,res){
    let zombie = await Zombie.findById(req.params.id);
    res.json('delete', {zombie: zombie});
  });
  
  router.delete('/zombies/delete/:id', async function(req,res){
    try{
      let zombie = await Zombie.findById(req.params.id);
      zombie.remove();
      res.status(200).json({ mensaje: 'Se elimino el registro:' + req.params.id});
      res.redirect('/');
    } catch(e){
      res.status(500).json({mensaje: e});
    }
  });

module.exports = router;