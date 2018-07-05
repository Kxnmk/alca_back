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
  getStatusHist:function(req, res){
    console.log('StatusDemanda');
    var query = 'EXEC uspStatusPorDemanda @DemCalve ='+req.params.id;
    executeQuery(res, query);
  },
  addStatusDemanda:function(req, res){
    console.log('AddStatusDemanda');
    let s = req.body;
    var query = "insert into "+tableN+" (SDClaveDem, SDClaveSta, SDClaveUsr , SDTimestamp) values ("+s.SDClaveDem+","+s.SDClaveSta+","+s.SDClaveUsr+",'" +s.SDTimestamp+"')"
    var query = "INSERT INTO [dbo].[StatusDemandas]([SDClaveDem], [SDClaveSta], [SDClaveUsr], [SDTimestamp],[SDComentarios]) VALUES ("+s.SDClaveDem+", "+s.SDClaveSta+", "+s.SDClaveUsr+",'" +s.SDTimestamp+"','"+s.SDComentarios+"');"
    executeQuery(res, query);
  },
  updateStatusDemanda:function(req, res){
    console.log('UpdateStatusDemanda');
    let s = req.body;
    var query = "update "+tableN+" set SDClaveUsr="+s.SDClaveUsr+",SDFechaCambio='"+s.SDFechaCambio+"' where SDClaveDem = "+req.params.id+" AND SDFechaCambio IS NULL";
    executeQuery(res, query, req);
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
module.exports=statusDemanda;
