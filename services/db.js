const mysql = require('mysql2/promise');
const config = require('../config/dbConnection');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  try{
    console.log(sql)
    const [results, ] = await connection.execute(sql, params);
    console.log(results)
    return results ? results : {};
  }
  catch(error){
    throw error;
  }
}


module.exports = {
  query
}