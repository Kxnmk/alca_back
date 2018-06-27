var express = require('express');
var router = express.Router();

var A=require('../models/statusRol');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getStatusRByRol(req, res);
  }
  else{
    A.getStatusR(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addStatusR(req, res);
});

router.put('/:id',function(req,res,next){
  A.updateStatusR(req, res);
});


module.exports=router;
