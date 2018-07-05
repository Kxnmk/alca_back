var express = require('express');
var router = express.Router();

var A=require('../models/proyectista');

router.get('/?',function(req,res,next){
  A.getAllProy(req, res);
});



module.exports=router;
