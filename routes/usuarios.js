var express = require('express');
var router = express.Router();
var U=require('../models/usuario');

router.get('/:id?',function(req,res,next){
  if(req.params.id){
    // U.getUsuarioById(req.params.id,function(err,rows){
    //   if(err)
    //   {
    //       res.json(err);
    //   }
    //   else{
    //       res.json(rows);
    //   }
    // });
  }
  else{
    console.log("Hola");
    res.json("Hola");
   // U.getAllUsuarios(function(err,rows){
   //    if(err)
   //    {
   //        console.log(err);
   //        res.json(err);
   //    }
   //    else
   //    {
   //        res.json(rows);
   //    }
   //  });
  }
});

router.post('/auth',function(req,res,next){
  // U.searchUsuario(req.body,function(err,rows){
  //     if(err)
  //     {
  //       res.json(err);
  //     }
  //     else{
  //       console.log(rows);
  //       res.json(rows);
  //     }
  // });
});

router.post('/',function(req,res,next){
  // U.addUsuario(req.body,function(err,count){
  //     if(err)
  //     {
  //       res.json(err);
  //     }
  //     else{
  //       res.json(req.body);//or return count for 1 & 0
  //     }
  // });
});

router.delete('/:id',function(req,res,next){
  // U.deleteUsuario(req.params.id,function(err,count){
  //
  //     if(err)
  //     {
  //         res.json(err);
  //     }
  //     else
  //     {
  //         res.json(count);
  //     }
  //
  // });
});
router.put('/:id',function(req,res,next){
  // U.updateUsuario(req.params.id,req.body,function(err,rows){
  //
  //     if(err)
  //     {
  //         res.json(err);
  //     }
  //     else
  //     {
  //         res.json(rows);
  //     }
  // });
});

module.exports=router;
