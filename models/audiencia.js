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

const tableN = "[dbo].[Audiencias]";

var audiencia={
  getAllAudiencias:function(req, res){
      console.log('AllAudiencias');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getAudienciaByRol:function(req, res){
      console.log('AudienciaByRol');
      //var query = 'select * from '+tableN+' where AudClave = '+req.params.id;
      const d = new Date();
      var query = "EXEC uspAudienciasPorRol @RolClave = "+req.params.id+", @Fecha = NULL";
      executeQuery(res, query);
    },
    addAudiencia:function(req, res){
      console.log('AddAudiencia');
      let a = req.body;
      var query = "insert INTO "+tableN+"([AudFecha], [AudHora], [AudClaveMesa], [AudClaveDemanda], [AudNotas]) VALUES ('"+a.AudFecha+"', '"+a.AudHora+"', "+a.AudClaveMesa+", "+a.AudClaveDemanda+", '"+a.AudNotas+"')";
      console.log(query);
      executeQuery(res, query);
    },
    deleteAudiencia:function(req, res){
      console.log('DeleteAudiencia');
      var query = 'delete from '+tableN+' where AudClave = '+req.params.id;
      console.log(query);
      executeQuery(res, query);
    },
    updateAudiencia:function(req, res){
        console.log('UpdateAudiencia');
        let a = req.body;
        var query = "update "+tableN+" set AudFecha='"+a.AudFecha+"',AudHora='"+a.AudHora+"',AudClaveMesa="+a.AudClaveMesa+", AudClaveDemanda="+a.AudClaveDemanda+",AudNotas ='"+a.AudNotas+"' where AudClave = "+req.params.id;
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
module.exports=audiencia;
