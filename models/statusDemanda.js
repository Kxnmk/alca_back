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

const tableN = "[dbo].[StatusDemandas]";

var statusDemanda={

  addStatusDemanda:function(req, res){
    console.log('AddStatusDemanda');
    let s = req.body;
    var query = "insert into "+tableN+" (SDClaveDem, SDClaveSta, SDClaveUsr , SDTimestamp) values ("+s.SDClaveDem+","+s.SDClaveSta+","+s.SDClaveUsr+",'" +s.SDTimestamp+"')"
    executeQuery(res, query);
  },
  updateStatusDemanda:function(req, res){
    console.log('UpdateStatusDemanda');
    let s = req.body;
    var query = "update "+tableN+" set SDClaveUsr="+s.SDClaveUsr+",SDFechaCambio='"+s.SDFechaCambio+"' where SDClaveDem = "+req.params.id+" AND SDFechaCambio IS NULL";
    executeQuery(res, query, req);
  },

}

var executeQuery = function(res, query, req){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    res.status(200).send({message: "Success"});
    sql.close();
  }).catch(err => {
    res.status(500).send({ message: ""+err});
    sql.close();
  });
}
module.exports=statusDemanda;
