const IncomingForm = require('formidable').IncomingForm;
var config = {
  user: 'Kxnmk_SQLLogin_1',
  password: 'wrzrj1lgme',
  server: 'db-Jlca.mssql.somee.com',
  database: 'db-Jlca',
  multipleStatements: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};
var sql=require('mssql');

const tableN = "[dbo].[Documentos]";

var upload={
    uploadFile:function(req, res){
      var form = new IncomingForm();
      //form.uploadDir = "/Users/gabriellopez/Desktop/documentos_upload";
      form.keepExtensions = true;
      form.encoding = 'utf-8';

      form.on('file', (field, file) => {
        console.log(file.path);

      });
      form.on('end', () => {
        res.json();
      });

      form.parse(req);
    }

  // getAllMesas:function(req, res){
  //   console.log('AllMesas');
  //   var query = 'select * from '+tableN;
  //   executeQuery(res, query);
  // },
  // getMesaById:function(req, res){
  //   console.log('getMesaById');
  //   var query = "select * from "+tableN+" where MesClave = "+req.params.id;
  //   executeQuery(res, query);
  // },
  // addMesa:function(req, res){
  //   console.log('AddMesa');
  //   let m = req.body;
  //   var query = "insert into "+tableN+" values("+m.MesClave+",'"+m.MesNombre+"','"+m.MesDescripcion+"')";
  //   executeQuery(res, query);
  // },
  // deleteMesa:function(req,res){
  //   console.log('DeleteMesa');
  //   var query = "delete from "+tableN+" where MesClave="+req.params.id;
  //   executeQuery(res, query);
  // },
  // updateMesa:function(req, res){
  //   console.log('UpdateMesa');
  //   let m = req.body;
  //   console.log(req.body);
  //   var query = "update "+tableN+" set MesNombre='"+m.MesNombre+"',MesDescripcion='"+m.MesDescripcion+"' where MesClave = "+req.params.id;
  //   executeQuery(res, query);
  // },

}

var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    if(result.recordset === undefined){
      res.status(200).send({message: "Success"})
    }else{
      let rows = result.recordset
      res.status(200).json(rows);
    }
    sql.close();
  }).catch(err => {
    res.status(500).send({ message: ""+err})
    sql.close();
  });
}
module.exports=upload;
