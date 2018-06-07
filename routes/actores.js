var express = require('express');
var router = express.Router();

var A=require('../models/actor');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getActorById(req, res);
  }
  else{
    A.getAllActores(req, res);
  }
});

router.post('/',function(req,res,next){
  A.addActor(req, res);
});

router.delete('/:id',function(req,res,next){
  A.deleteActor(req,res);
});
router.put('/:id',function(req,res,next){
  A.updateActor(req, res);
});


module.exports=router;
