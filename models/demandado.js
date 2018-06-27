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

const tableN = "[dbo].[Demandados]";

var demandado={
  getAllDemandas:function(req, res){
      console.log('AllDemandados');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getDemandaById:function(req, res){
      console.log('DemandadoById');
      var query = 'select * from '+tableN+' where DeoClave = '+req.params.id;
      executeQuery(res, query);
    },
    addDemanda:function(req, res){
      console.log('AddDemandado');
      let d = req.body;
      console.log(d);
      var query = "insert into "+tableN+" values("+d.DeoClave+",'"+d.DeoNombre+"','"+d.DeoDomicilio+"','"+d.DeoTelefono+"','"+d.DeoCorreo+"','"+d.DeoNombreRepresentantes+"','"+d.DeoMoral+"')";
      console.log(query);
      executeQuery(res, query);
    },
    deleteDemanda:function(req, res){
      console.log('DeleteDemandado');
      var query = 'delete from '+tableN+' where DeoClave = '+req.params.id;
      console.log(query);
      executeQuery(res, query);
    },
    updateDemanda:function(req, res){
        console.log('UpdateDemandado');
        let d = req.body;
        console.log(req.body);
        var query = "update "+tableN+" set DeoNombre='"+d.DeoNombre+"',DeoDomicilio='"+d.DeoDomicilio+"',DeoTelefono='"+d.DeoTelefono+"', DeoCorreo='"+d.DeoCorreo+"', DeoNombreRepresentantes='"+d.DeoNombreRepresentantes+"', DeoMoral='"+d.DeoMoral+"' where DeoClave = "+req.params.id;
        console.log(query);
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
module.exports=demandado;
