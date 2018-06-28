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

const tableN = "[dbo].[Demandas]";

var demanda={
  getAllDemandas:function(req, res){
      console.log('AllDemandas');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getDemandaByRol:function(req, res){
      console.log('DemandaByRol');
      var query = "EXEC uspDemandasPorRol @RolClave = "+req.params.id
      executeQuery(res, query);
    },
    addDemanda:function(req, res){
      console.log('AddDemanda');
      let d = req.body;
      console.log(d);
      var query = "insert into "+tableN+" values("+d.DemClave+",'"+d.DemFolio+"','"+d.DemClaveActor+"','"+d.DemClaveDemandado+"','"+d.DemCiudad+"','"+d.DemFecha+"','"+d.DemTipo+"')";
      console.log(query);
      executeQuery(res, query);
    },
    deleteDemanda:function(req, res){
      console.log('DeleteDemanda');
      var query = 'delete from '+tableN+' where DemClave = '+req.params.id;
      console.log(query);
      executeQuery(res, query);
    },
    updateDemanda:function(req, res){
        console.log('UpdateDemanda');
        let d = req.body;
        console.log(req.body);
        var query = "update "+tableN+" set DemFolio='"+d.DemFolio+"',DemClaveActor="+d.DemClaveActor+",DemClaveDemandado="+d.DemClaveDemandado+", DemCiudad='"+d.DemCiudad+"', DemFecha='"+d.DemFecha+"' where DemClave = "+req.params.id;
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
module.exports=demanda;
