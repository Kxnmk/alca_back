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
      var query = "SELECT * from Comisiones INNER JOIN Usuarios ON Comisiones.ComClaveUsuario = Usuarios.usrClave INNER JOIN Roles on Comisiones.ComClaveRol = Roles.RolClave LEFT JOIN Mesas on Comisiones.ComClaveMesa = Mesas.MesClave WHERE Comisiones.ComFechaConclusion IS NULL"
      executeQuery(res, query);
    },
    getComisionById:function(req, res){
      console.log('ComisionById');
      var query = 'select * from '+tableN+' where ComClave = '+req.params.id;
      executeQuery(res, query);
    },
    addComision:function(req, res){
      console.log('AddComision');
      let c = req.body;

      var query = "EXEC uspNuevaComision @usrClave="+c.ComClaveUsuario+", @comClaveMesa="+c.ComClaveMesa+", @comClaveRol="+c.ComClaveRol
      console.log(query);
      executeQuery(res, query);
    }
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
module.exports=comision;
