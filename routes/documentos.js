var express = require('express');
var router = express.Router();

var A=require('../models/documento');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getDocumentosByDemanda(req, res);
  }
  else{
    res.status(500);
  }
});

router.put('/:id',function(req,res,next){
  A.updateDocumento(req, res);
});


module.exports=router;
