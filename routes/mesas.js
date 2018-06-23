var express = require('express');
var router = express.Router();

var A=require('../models/mesa');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getMesaById(req, res);
  }
  else{
    A.getAllMesas(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addMesa(req, res);
});

router.delete('/:id',function(req,res,next){
  A.deleteMesa(req,res);
});
router.put('/:id',function(req,res,next){
  A.updateMesa(req, res);
});


module.exports=router;
