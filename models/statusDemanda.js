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

const tableN = "[dbo].[StatusDemanda]";

var statusDemanda={

  addStatusDemanda:function(req, res){
    console.log('AddStatusDemanda');
    let s = req.body;
    var query = "insert into "+tableN+" values("+s.SDClave+","+s.SDClaveDem+","+s.SDClaveSta+","+s.SDClaveUsr+",'" +s.SDTimestamp+"','"+s.SDFechaCambio+"','"+s.SDComentarios+"')";
    executeQuery(res, query);
  },
  updateStatusDemanda:function(req, res){
    console.log('UpdateStatusDemanda');
    let s = req.body;
    var query = "update "+tableN+" set SDClaveDem="+s.SDClaveDem+",SDClaveSta="+s.SDClaveSta+",SDClaveUsr="+s.SDClaveUsr+",SDTimestamp="+s.SDTimestamp+",SDFechaCambio="+s.SDFechaCambio+",SDComentarios="+s.SDComentarios+" where SDClave = "+req.params.id;
    executeQuery(res, query);
  },

}

var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    return true;
    sql.close();
  }).catch(err => {
    return false
    sql.close();
  });
}
module.exports=statusDemanda;
