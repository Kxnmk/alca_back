var express = require('express');
var router = express.Router();
var U=require('../models/usuario');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    U.getUsuarioById(req, res);
  }
  else{
    U.getAllUsuarios(req,res);
  }
});

router.post('/auth',function(req,res,next){
  U.checkUsuario(req,res);
});

router.post('/',function(req,res,next){
  U.addUsuario(req, res);
});

router.delete('/:id',function(req,res,next){
  U.deleteUsuario(req,res);
});
router.put('/:id',function(req,res,next){
  console.log('Update Usuario');
  U.updateUsuario(req, res);
});


module.exports=router;
