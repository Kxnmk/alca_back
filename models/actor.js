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

const tableN = "[dbo].[Actores]";

var actor={
  getAllActores:function(req, res){
      console.log('AllActores');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getActorById:function(req, res){
      console.log('ActorById');
      var query = 'select * from '+tableN+' where ActClave = '+req.params.id;
    },
    addActor:function(req, res){
      console.log('AddActor');
      let u = req.body;
      console.log(u);
      var query = "insert into "+tableN+" values("+u.ActClave+",'"+u.ActNombre+"','"+u.ActDomicilio+"','"+u.ActNota+"','"+u.ActTelefono+"','"+u.ActCorreo+"','"+u.ActClaveRepresentanteAct+"')";
      console.log(query);
      executeQuery(res, query);
    },
    deleteActor:function(req, res){
      console.log('DeleteActor');
      var query = 'delete from '+tableN+' where ActClave = '+req.params.id;
      console.log(query);
      executeQuery(res, query);
    },
    updateActor:function(req, res){
        console.log('UpdateActor');
        let u = req.body;
        console.log(req.body);
        var query = "update "+tableN+" set ActNombre='"+u.ActNombre+"',ActDomicilio='"+u.ActDomicilio+"',ActNota='"+u.ActNota+"', ActTelefono='"+u.ActTelefono+"', ActCorreo='"+u.ActCorreo+"', ActClaveRepresentanteAct='"+u.ActClaveRepresentanteAct+"' where ActClave = "+req.params.id;
        console.log(query);
        executeQuery(res, query);
      },
}


var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    let rows = result.recordset
    res.status(200).json(rows);
    sql.close();
  }).catch(err => {
    res.status(500).send({ message: ""+err})
    sql.close();
  });
}
module.exports=actor;
