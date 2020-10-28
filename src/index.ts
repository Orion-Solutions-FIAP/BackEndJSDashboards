import "reflect-metadata";
import {Connection, createConnection, getConnection} from "typeorm";
import * as moment from 'moment'
import express = require('express');
let app = express();
var cors = require('cors')

app.use(cors())

createConnection({
  type: "oracle",
  connectString: "(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(Host = oracle.fiap.com.br)(Port = 1521)))(CONNECT_DATA =(sid = orcl)(SERVER=dedicated)))",
  username: "RM84310",
  password: "271193"
}).then(async connection => {

  app.get('/dashBoardFunc',async (req,res)=>{
    //let { userName } = req.body;
    let activityBydate = await connection.query('select  count(1), dt_FIM from T_OPS_FUNC_TAREFA where CD_CONTA_FUNC = 21 group by dt_FIM');
    let arrayDash = activityBydate.map(activity=>{
      return [moment(activity['DT_FIM']).format('MMM-DD').toString(),activity['COUNT(1)']]
    })
    res.json({result:[['Data', 'Sales']].concat(arrayDash)})
  })

  app.get('/dashBoardFunc/:employee',async (req,res)=>{
    console.log(req.params['employee']);
    //let { userName } = req.body;
    
    let activityBydate = await connection.query(`select count(1),DT_FIM from T_OPS_FUNC_TAREFA where CD_CONTA_FUNC = (select CD_CONTA from T_OPS_FUNCIONARIO where NM_FUNC like '%${req.params['employee']}%') and cd_status = 3 group by DT_FIM`);
    let arrayDash = activityBydate.map(activity=>{
      return [moment(activity['DT_FIM']).format('MMM-DD').toString(),activity['COUNT(1)']]
    })
    res.json({result:[['Data', 'Sales']].concat(arrayDash)})
  })

  app.get('/dashBoardPermormance',async (req,res)=>{
    //let { userName, team} = req.body;
    let activityBydate = await connection.query('select  count(1), dt_FIM from T_OPS_FUNC_TAREFA where cd_status = 3 group by dt_FIM');
    let arrayDash = activityBydate.map(activity=>{
      return [moment(activity['DT_FIM']).format('MMM-DD').toString(),activity['COUNT(1)']]
    })
    res.json({result:arrayDash})
  })

  app.get('/dashBoardPermormance/:company',async (req,res)=>{
    //let { userName, team} = req.body;
    let activityBydate = await connection.query('select  count(1), dt_FIM from T_OPS_FUNC_TAREFA where cd_status = 3 group by dt_FIM');
    let arrayDash = activityBydate.map(activity=>{
      return [moment(activity['DT_FIM']).format('MMM-DD').toString(),activity['COUNT(1)']]
    })
    res.json({result:arrayDash})
  })

  app.get('/employes',async (req,res)=>{
    let emplyesList = await connection.query('select distinct(NM_FUNC) from T_OPS_FUNCIONARIO');
    res.json({result:emplyesList})
  })

  app.get('/teams',async (req,res)=>{
    let teamsList = await connection.query(`select CD_DEPTO, CONCAT('Departamento ',NM_DEPTO) from T_OPS_DEPARTAMENTO`);
    res.json({result:teamsList})
  })

}).catch(error => console.log("TypeORM connection error: ", error));

app.listen('8080',()=>{
  console.log('listening on port 8080')
})