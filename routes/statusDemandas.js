var express = require('express');
var router = express.Router();

var A=require('../models/statusDemanda');


router.post('/',function(req,res,next){
  if(A.addStatusDemanda(req, res)){
    res.status(200).send({message: "Success"});
  } else {
    res.status(500).send({ message: ""+err});
  }
});

router.put('/:id',function(req,res,next){
  if( A.updateStatusDemanda(req, res) &&   A.addStatusDemanda(req, res) ){
    res.status(200).send({message: "Success"});
  } else {
    res.status(500).send({ message: ""+err});
  }

});


module.exports=router;
