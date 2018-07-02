var express = require('express');
var router = express.Router();

var A=require('../models/audiencia');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getAudienciaByRol(req, res);
  }
  else{
    A.getAllAudiencias(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addAudiencia(req, res);
});

router.delete('/:id',function(req,res,next){
  A.deleteAudiencia(req,res);
});
router.put('/:id',function(req,res,next){
  A.updateAudiencia(req, res);
});


module.exports=router;
