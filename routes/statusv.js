var express = require('express');
var router = express.Router();

var A=require('../models/status');

router.get('/:id?',function(req,res,next){
  if(req.params.id){

  }
  else{
    A.getAllStatus(req, res);
  }
});


module.exports=router;
