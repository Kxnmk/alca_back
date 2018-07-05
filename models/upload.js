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
var file;

var upload={

    uploadFile:function(req, res){
      var form = new IncomingForm();

      form.uploadDir = "/Users/gabriellopez/Desktop/documentos_upload";
      form.keepExtensions = true;
      form.encoding = 'utf-8';
      form.hash = 'md5';
      form.on('field', function(name, value) {
        var obj = JSON.parse(value);
        //console.log(obj);
        console.log('AddDocumento');
        let u = req.body;
        var d = new Date();
        var aux = obj.DocNombre.split(".");
        var nmF = (aux[0]+d.getFullYear()+"_"+d.getUTCMonth()+"_"+d.getUTCDate()+"_"+d.getUTCMinutes()+"."+aux[1]);
        var query = "INSERT INTO "+tableN+"([DocNombre], [DocTipo], [DocCantidadCopias], [DocDescripcion], [DocNotas], [DocClaveUsuarioCreado], [DocFechaCreacion], [DocClaveDemanda]) VALUES ('"+nmF+"', '"+obj.DocTipo+"', "+obj.DocCantidadCopias+", '"+obj.DocDescripcion+"', '"+obj.DocNotas+"', "+obj.DocClaveUsuarioCreado+", '"+obj.DocFechaCreacion+"', "+obj.DocClaveDemanda+")";

        executeQuery(res, query);


      });
      form.on('file', (field, file) => {
        //console.log(file.path);
        // Guardado en Base de datos
        var d = new Date();
        var aux = file.name.split(".");
        var nmF = (aux[0]+d.getFullYear()+"_"+d.getUTCMonth()+"_"+d.getUTCDate()+"_"+d.getUTCMinutes()+"."+aux[1]);

        var query = "UPDATE [dbo].[Documentos] SET [DocHash] = '"+file.hash+"', [DocRuta] = '"+file.path+"' WHERE [DocNombre] = '" + nmF+"'";
        executeQuery(res, query);
      });




      form.on('end', () => {
        res.json();
      });

      form.parse(req);

    }


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
