var express = require('express');
var router = express.Router();

var A=require('../models/comision');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getComisionById(req, res);
  }
  else{
    A.getAllComisiones(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addComision(req, res);
});

router.put('/:id',function(req,res,next){
  A.updateComision(req, res);
});


module.exports=router;
