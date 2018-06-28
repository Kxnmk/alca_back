var express = require('express');
var router = express.Router();

var A=require('../models/demanda');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getDemandaByRol(req, res);
  }
  else{
    A.getAllDemandas(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addDemanda(req, res);
});

router.delete('/:id',function(req,res,next){
  A.deleteDemanda(req,res);
});
router.put('/:id',function(req,res,next){
  A.updateDemanda(req, res);
});


module.exports=router;
