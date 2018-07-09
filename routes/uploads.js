var express = require('express');
var router = express.Router();

var U=require('../models/upload');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    U.openFile(req, res);
  }
});

router.post('/',function(req,res){
  U.uploadFile(req, res);
});



module.exports=router;
