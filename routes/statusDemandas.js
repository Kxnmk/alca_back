var express = require('express');
var router = express.Router();

var A=require('../models/statusDemanda');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    A.getStatusHist(req, res);
  }
});


router.post('/',function(req,res,next){
  A.addStatusDemanda(req, res);
});

router.put('/:id',function(req,res,next){
  A.updateStatusDemanda(req, res)

});


module.exports=router;
