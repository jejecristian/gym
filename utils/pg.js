const { Pool } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};

const pool = new Pool(config);

const insertar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'INSERT INTO ejercicios (nombre, series, repeticiones, descanso) VALUES($1, $2, $3, $4) RETURNING *;',
      values
    });
    return result.rows;
  } catch ({ code, message }) {
    return { code, message };
  } finally {
    if (client) client.release(pool.end);
  }
};

const leer = async ()=> {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'SELECT * FROM ejercicios;'
    });
    return result;
  } catch ({code, message}) {
    return {code, message};
  }finally{
    if(client) client.release(pool.end);
  }
};

const actualizar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'UPDATE ejercicios SET series = $2, repeticiones = $3, descanso = $4 WHERE nombre = $1 RETURNING *',
      values
    });
    return result;
  } catch ({code, message}) {
    return {code, message};
  }finally{
    if(client) client.release(pool.end);
  }
}

const eliminar = async (values) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query({
      text: 'DELETE FROM ejercicios WHERE nombre = $1 RETURNING *',
      values
    });
    return result;
  } catch ({code, message}) {
    return {code, message};
  } finally {
    if(client) client.release(pool.end);
  }
}


module.exports = { insertar, leer, actualizar, eliminar };