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
var fs = require('fs');

const tableN = "[dbo].[Documentos]";
var data;

var upload={

    openFile:function(req, res){
      var docName = "uploads/"+req.params.id;
      res.download(docName);
    },
    uploadFile:function(req, res){
      var form = new IncomingForm();

      form.uploadDir = "./uploads";
      form.keepExtensions = true;
      form.encoding = 'utf-8';
      form.hash = 'md5';
      form.on('file', (field, file) => {
        savefile(req, res, file);
      });
      form.on('field', function(name, value) {
        var obj = JSON.parse(value);
        tmpD(obj);
      });

      form.on('end', () => {
        res.json();
      });

      form.parse(req);

    }


}

var tmpD = function (data){
  this.data = data;
}

var savefile = function (req, res, file) {
  console.log(file);
  console.log(this.data);
  console.log('AddDocumento');
  var obj = this.data;
  let u = req.body;
  var d = new Date();
  var aux = obj.DocNombre.split(".");
  var pt = file.path.split("/");
  var nmF = (aux[0]+d.getFullYear()+"_"+d.getUTCMonth()+"_"+d.getUTCDate()+"_"+d.getUTCMinutes()+d.getUTCSeconds()+"."+aux[1]);
  var query = "INSERT INTO "+tableN+"([DocNombre], [DocTipo], [DocCantidadCopias], [DocDescripcion], [DocNotas], [DocClaveUsuarioCreado], [DocFechaCreacion], [DocClaveDemanda], [DocHash], [DocRuta]) VALUES ('"+nmF+"', '"+obj.DocTipo+"', "+obj.DocCantidadCopias+", '"+obj.DocDescripcion+"', '"+obj.DocNotas+"', "+obj.DocClaveUsuarioCreado+", '"+obj.DocFechaCreacion+"', "+obj.DocClaveDemanda+", '"+file.hash+"', '"+pt[1]+"')";

  executeQuery(res, query);

}


var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    sql.close();
  }).catch(err => {
    sql.close();
  });
}
module.exports=upload;
