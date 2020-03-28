var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie");

var Cerebro = require("../models/cerebro");

/* GET home page. */
router.get('/', function(req, res, next) {
  Zombie.find().exec(function(error,zombies){
    if(!error){
     // console.log(zombies);
      res.render('index', { title: 'Zombies', viewZombies: zombies});
    }
  });
  
});

router.get('/cerebros', function(req, res, next) {
  Cerebro.find().exec(function(error,cerebros){
    if(!error){
      res.render('cerebros/index', { title: 'Cerebros',  viewCerebros: cerebros});
    }
  });
  
});

//crear zombie
router.get('/zombies/add', function(req, res) {
  res.render('add', {mensaje:"", estadoMensaje:""});
});

router.post('/zombies/new', function(req,res){
  var data = req.body;
  
  var nuevoZombie = new Zombie({
    name: data.name,
    email: data.email,
    type: data.type
  })
 //{mensaje:"Se agrego un nuevo Zombie", estadoMensaje:"success"},
  nuevoZombie.save(function(error){
    var array = ["name","email","type"];

    detectorErrores(array);

    function detectorErrores(errores){
      if(error){
        for (var i=0; i< errores.length; i++){
          aux = errores[i];
          console.log(aux);
          if(error.errors[aux]){
            console.log(error.errors[aux].message);
            res.render('add', {mensajeError: error.errors[aux].message})
          }
          else{
            console.log("No es error en" +aux);
          }
        }
      }
      else{
        res.render('add', {MensajeExito: "Se creó un nuevo zombie!"});
        return;
      }
    }
  
  });

});


//Editar zombie
router.get('/zombies/edit/:id', async function(req,res){
  var zombie = await Zombie.findById(req.params.id);
  res.render('edit',{zombie,zombie});
});

router.put('/zombies/edit/:id', async function(req,res){
  try{
  var zombie = await Zombie.findById(req.params.id);
  zombie.name = req.body.name;
  zombie.email = req.body.email;
  zombie.type = req.body.type;

  await zombie.save();
  res.redirect('/');
  
  }catch(e){
    res.render('edit',{zombie: zombie, mensajeError: e.message});
  }
  
});
 

//eliminar zombie
router.get('/zombies/delete/:id',async function(req,res){
  var zombie = await Zombie.findById(req.params.id);
  res.render('delete', {zombie: zombie});
});

router.delete('/zombies/delete/:id', async function(req,res){
  var zombie = await Zombie.findById(req.params.id);

  try{
    zombie.remove();
    res.redirect('/');
  } catch(e){
    
  }
});


//crear un nuevo cerebro
router.get('/cerebros/addce', function(req, res) {
  res.render('addce', {mensajeCerebro:"", estadoMensajeCerebro:""});
});

router.post('/cerebros/nuevo', function(req,res){
  var data = req.body;
  
  var nuevoCerebro = new Cerebro({
    description: data.description,
    flavor: data.flavor,
    price: data.price,
    picture: data.picture
  })

//guardar cerebro en la coleccion
  nuevoCerebro.save(function(error){
    var arrayce = ["description","flavor","price","picture"];

    detectarErrores(arrayce);

    function detectarErrores(erroresce){
      if(error){
        for (var i=0; i< erroresce.length; i++){
          auxce = erroresce[i];
          console.log(auxce);
          if(error.errors[auxce]){
            console.log(error.errors[auxce].message);
            res.render('addce', {mensajeErrorce: error.errors[auxce].message})
          }
          else{
            console.log("No es error en" +auxce);
          }
        }
      }
      else{
        res.render('addce', {MensajeExitoce: "Se creó un nuevo cerebro!"});
        return;
      }
    }
  });

});

//Editar cerebro
router.get('/cerebros/editce/:id', async function(req,res){
  var cerebro = await Cerebro.findById(req.params.id);
  res.render('editce',{cerebro,cerebro});
});

router.put('/cerebros/editce/:id', async function(req,res){
  try{
  var cerebro = await Cerebro.findById(req.params.id);
  cerebro.description = req.body.description;
  cerebro.flavor = req.body.flavor;
  cerebro.price = req.body.price;
  cerebro.picture = req.body.picture;
  console.log(cerebro);

  await cerebro.save();
  res.redirect('/cerebros');
  
  }catch(e){
    res.render('editce',{cerebro: cerebro,  mensajeError: e.message});
  }
  
});
 

//eliminar carebro
router.get('/cerebros/deletece/:id',async function(req,res){
  var cerebro = await Cerebro.findById(req.params.id);
  res.render('deletece', {cerebro: cerebro});
});

router.delete('/cerebros/deletece/:id', async function(req,res){
  var cerebro = await Cerebro.findById(req.params.id);

  try{
    cerebro.remove();
    res.redirect('/cerebros');
  } catch(e){
    
  }
});



module.exports = router;
