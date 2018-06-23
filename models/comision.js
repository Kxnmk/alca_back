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

const tableN = "[dbo].[Comisiones]";

var comision={
  getAllComisiones:function(req, res){
      console.log('AllComisiones');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getComisionById:function(req, res){
      console.log('ComisionById');
      var query = 'select * from '+tableN+' where AudClave = '+req.params.id;
      executeQuery(res, query);
    },
    addComision:function(req, res){
      console.log('AddComision');
      let c = req.body;
      console.log(u);
      var query = "insert into "+tableN+" values("+c.ComClave+",'"+c.ComClaveMesa+"','"+c.ComClaveUsuario+"','"+c.ComFechaAsignacion+"','"+c.ComFechaConclusion+"','"+c.ComClaveRol+"')";
      console.log(query);
      executeQuery(res, query);
    },
    updateComision:function(req, res){
        console.log('UpdateComision');
        let c = req.body;
        console.log(req.body);
        var query = "update "+tableN+" set ComClaveMesa='"+c.ComClaveMesa+"',ComClaveUsuario='"+c.ComClaveUsuario+"',ComFechaAsignacion='"+c.ComFechaAsignacion+"', ComFechaConclusion='"+c.ComFechaConclusion+"', ComClaveRol='"+c.ComClaveRol+"' where ComClave = "+req.params.id;
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
module.exports=comision;
