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

var documento={

  getDocumentosByDemanda:function(req, res){
    console.log('GetDocumentosByDemanda');
    var query = "select * from "+tableN+" where DocClaveDemanda = "+req.params.id;
    executeQuery(res, query);
  },
  updateDocumento:function(req, res){
    console.log('UpdateDataDocumento');
    let d = req.body;
    console.log(req.body);
    var query = "update "+tableN+" set DocTipo= '"+d.DocTipo+"', DocCantidadCopias = "+d.DocCantidadCopias+", DocDescripcion = '"+d.DocDescripcion+"', DocNotas='"+d.DocNotas+"' where DocClave = "+req.params.id;
    executeQuery(res, query);
  },

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
module.exports=documento;
