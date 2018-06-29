var express = require('express');
var router = express.Router();

var U=require('../models/upload');

router.get('/:id?',function(req,res){
  if(req.params.id){
    U.getMesaById(req, res);
  }
  else{
    U.getAllMesas(req, res);
  }
});

router.post('/',function(req,res){
  U.uploadFile(req, res);
});

router.delete('/:id',function(req,res){
  U.deleteMesa(req,res);
});
router.put('/:id',function(req,res){
  U.updateMesa(req, res);
});


module.exports=router;
